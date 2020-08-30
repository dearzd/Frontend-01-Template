import {createElement} from './createElement';
import {Timeline, Animation} from './animation.js';
import {cubicBezier} from './cubicBezier.js';
import './carousel.css';

/*import css from './carousel.css';
console.log(css);
let style = document.createElement('style');
style.innerHTML = css[0][1];
document.documentElement.appendChild(style);*/

export default class Carousel {
    constructor() {
        this.data = null
        this.intervel = null;
        this.duration = null;
        this.children = [];
        this.position = 0;
        this.tl = new Timeline();
        this.ease = cubicBezier(.25,.1,.25,1);
        this.timeId = null;
        this.state = 'inited';

        this.onStart = this.onStart.bind(this);
        this.onPan = this.onPan.bind(this);
        this.onPanEnd = this.onPanEnd.bind(this);
        this.nextPic = this.nextPic.bind(this);
    }

    setAttribute(name, value) { // attribute
        this[name] = value;
    }

    play() {
        this.state = 'playing';
        clearTimeout(this.timeId);
        this.timeId = setTimeout(this.nextPic, this.intervel);
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

    onStart(event) {
        this.pause();

        this.state = 'dragging';

        let startX = event.detail.clientX;
        let lastPosition = (this.position - 1 + this.data.length) % this.data.length;
        let nextPosition = (this.position + 1) % this.data.length;

        let current = this.children[this.position];
        let last = this.children[lastPosition];
        let next = this.children[nextPosition];

        let translateX = current.style.transform;
        let currentX = 0;

        if (translateX) {
            currentX = current.style.transform.match(/translateX\(([\s\S]+)px\)/)[1] - 0;
        }

        console.log(currentX);
        let offset = currentX + 500 * this.position;

        this.lastPosition = lastPosition;
        this.nextPosition = nextPosition;
        this.current = current;
        this.last = last;
        this.next = next;
        this.startX = startX;
        this.offset = offset;
    }

    onPan(event) {
        console.log('on pan');

        let x = event.detail.clientX - this.startX;

        this.current.style.transform = `translateX(${x - 500 * this.position + this.offset}px)`;
        this.last.style.transform = `translateX(${x - 500 - 500 * this.lastPosition + this.offset}px)`;
        this.next.style.transform = `translateX(${x + 500 - 500 * this.nextPosition + this.offset}px)`;
    }

    onPanEnd(event) {
        let x = event.detail.clientX - this.startX;
        let direction = 0;
        console.log('on panend', x + this.offset, event.detail.isFlick);
        if (x + this.offset > 250 || x > 0 && event.detail.isFlick) {
            direction = 1;
        } else if (x + this.offset < -250 || x < 0 && event.detail.isFlick) {
            direction = -1;
        }

        this.tl.reset();
        this.tl.add(new Animation({
            object: this.current.style,
            property: 'transform',
            start: x - 500 * this.position + this.offset,
            end: direction * 500 - 500 * this.position,
            duration: this.duration,
            delay: 0,
            timingFunction: this.ease,
            template: v => `translateX(${v}px`
        }));
        this.tl.add(new Animation({
            object: this.last.style,
            property: 'transform',
            start: x - 500 - 500 * this.lastPosition + this.offset,
            end: direction * 500 - 500 - 500 * this.lastPosition,
            duration: this.duration,
            delay: 0,
            timingFunction: this.ease,
            template: v => `translateX(${v}px`
        }));
        this.tl.add(new Animation({
            object: this.next.style,
            property: 'transform',
            start: x + 500 - 500 * this.nextPosition + this.offset,
            end: direction * 500 + 500 - 500 * this.nextPosition,
            duration: this.duration,
            delay: 0,
            timingFunction: this.ease,
            template: v => `translateX(${v}px)`
        }));

        this.tl.start();

        this.position = (this.position - direction + this.data.length) % this.data.length;
        this.resume();
    }

    nextPic() {
        // console.log('next', this.tl);
        let nextPosition = (this.position + 1) % this.data.length;

        let current = this.children[this.position];
        let next = this.children[nextPosition];

        this.tl.reset();

        this.tl.add(new Animation({
            object: current.style,
            property: 'transform',
            start: - 500 * this.position,
            end: -500 - 500 * this.position,
            duration: this.duration,
            delay: 0,
            timingFunction: this.ease,
            template: v => `translateX(${v}px)`
        }));
        this.tl.add(new Animation({
            object: next.style,
            property: 'transform',
            start: 500 - 500 * nextPosition,
            end: -500 * nextPosition,
            duration: this.duration,
            delay: 0,
            timingFunction: this.ease,
            template: v => `translateX(${v}px)`
        }));

        this.tl.start();

        this.position = nextPosition;

        this.timeId = setTimeout(this.nextPic, this.intervel);
    }

    render() {
        const children = this.data.map(url => {
            return (
                <img
                    src={url}
                    enableGesture={true}
                    onStart={this.onStart}
                    onPan={this.onPan}
                    onPanend={this.onPanEnd}
                    ondragstart={e => e.preventDefault()} />
            );
        });
        this.children = children;
        this.play();

        return (
            <div class="carousel">
                {children}
            </div>
        );
    }

    mountTo(parent) {
        this.render().mountTo(parent);
    }
}