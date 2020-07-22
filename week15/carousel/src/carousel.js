import {createElement} from './createElement';
import {Timeline, Animation} from './animation.js';
import {cubicBezier} from './cubicBezier.js';

export default class Carousel {
    constructor() {
        this.data = null
        this.duration = null;
        this.children = [];
        this.position = 0;
        this.tl = new Timeline();
        this.ease = cubicBezier(.25,.1,.25,1);
        this.timeId = null;
        this.state = 'inited';

        this.nextPic = this.nextPic.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    setAttribute(name, value) { // attribute
        this[name] = value;
    }

    play() {
        this.state = 'playing';
        clearTimeout(this.timeId);
        this.timeId = setTimeout(this.nextPic, this.duration);
    }

    pause() {
        if (this.state !== 'playing') {
            return;
        }
        this.state = 'paused';
        this.tl.pause();
        clearTimeout(this.timeId);
    }

    resume() {
        if (this.state !== 'paused' && this.state !== 'dragging') {
            return;
        }
        this.tl.resume();
        this.play();
    }

    nextPic() {
        console.log('next', this.tl);
        let nextPosition = (this.position + 1) % this.data.length;

        let current = this.children[this.position];
        let next = this.children[nextPosition];

        this.tl.reset();

        this.tl.add(new Animation({
            object: current.style,
            property: 'transform',
            start: - 100 * this.position,
            end: -100 - 100 * this.position,
            duration: 500,
            delay: 0,
            timingFunction: this.ease,
            template: v => `translateX(${v}%)`
        }));
        this.tl.add(new Animation({
            object: next.style,
            property: 'transform',
            start: 100 - 100 * nextPosition,
            end: -100 * nextPosition,
            duration: 500,
            delay: 0,
            timingFunction: this.ease,
            template: v => `translateX(${v}%)`
        }));

        this.tl.start();

        this.position = nextPosition;

        /*// disable image transition
        current.style.transition = 'ease 0s';
        next.style.transition = 'ease 0s';
        current.style.transform = `translateX(${- 100 * this.position}%)`;
        next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

        setTimeout(() => {
            // open img transition
            current.style.transition = '';
            next.style.transition = '';

            current.style.transform = `translateX(${-100 - 100 * this.position}%)`;
            next.style.transform = `translateX(${- 100 * nextPosition}%)`;

            this.position = nextPosition;
        }, 16);*/

        this.timeId = setTimeout(this.nextPic, this.duration);
    }

    handleMouseOver() {
        this.pause();
    }

    handleMouseOut() {
        this.resume();
    }

    handleMouseDown(event) {
        this.state = 'dragging';

        let startX = event.clientX;
        let lastPosition = (this.position - 1 + this.data.length) % this.data.length;
        let nextPosition = (this.position + 1) % this.data.length;

        let current = this.children[this.position];
        let last = this.children[lastPosition];
        let next = this.children[nextPosition];

        // disable image transition
        /*current.style.transition = 'ease 0s';
        last.style.transition = 'ease 0s';
        next.style.transition = 'ease 0s';*/

        current.style.transform = `translateX(${-500 * this.position}px)`;
        last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
        next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

        let handleMove = event => {
            let x = event.clientX - startX;

            current.style.transform = `translateX(${x - 500 * this.position}px)`;
            last.style.transform = `translateX(${x - 500 - 500 * lastPosition}px)`;
            next.style.transform = `translateX(${x + 500 - 500 * nextPosition}px)`;
        };
        let handleUp = (event) => {
            let x = event.clientX - startX;
            let offset = 0;
            if (x > 250) {
                offset = 1;
            } else if (x < -250) {
                offset = -1;
            }

            /*// open img transition
            current.style.transition = '';
            last.style.transition = '';
            next.style.transition = '';

            current.style.transform = `translateX(${offset * 500 - 500 * this.position}px)`;
            last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;
            next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;*/

            this.tl.reset();
            this.tl.add(new Animation({
                object: current.style,
                property: 'transform',
                start: x - 500 * this.position,
                end: offset * 500 - 500 * this.position,
                duration: 500,
                delay: 0,
                timingFunction: this.ease,
                template: v => `translateX(${v}px`
            }));
            this.tl.add(new Animation({
                object: last.style,
                property: 'transform',
                start: x - 500 - 500 * lastPosition,
                end: offset * 500 - 500 - 500 * lastPosition,
                duration: 500,
                delay: 0,
                timingFunction: this.ease,
                template: v => `translateX(${v}px`
            }));
            this.tl.add(new Animation({
                object: next.style,
                property: 'transform',
                start: x + 500 - 500 * nextPosition,
                end: offset * 500 + 500 - 500 * nextPosition,
                duration: 500,
                delay: 0,
                timingFunction: this.ease,
                template: v => `translateX(${v}px)`
            }));
            this.tl.start();

            this.position = (this.position - offset + this.data.length) % this.data.length;
            this.resume();

            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('selectstart', disableSelect);
        };
        let disableSelect = event => event.preventDefault();

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
        document.addEventListener('selectstart', disableSelect);
    }

    render() {
        const children = this.data.map(url => <img src={url} ondragstart={e => e.preventDefault()} />);
        this.children = children;
        this.play();

        return (
            <div class="carousel" onmousedown={this.handleMouseDown} onmouseover={this.handleMouseOver} onmouseout={this.handleMouseOut}>
                {children}
            </div>
        );
    }

    mountTo(parent) {
        this.render().mountTo(parent);
    }
}