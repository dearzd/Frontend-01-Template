import {createElement} from './createElement';

export default class Carousel {
    constructor() {
        this.children = [];
        this.position = 0;

        this.nextPic = this.nextPic.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    setAttribute(name, value) { // attribute
        this[name] = value;
    }

    nextPic() {
        let nextPosition = (this.position + 1) % this.data.length;

        let current = this.children[this.position];
        let next = this.children[nextPosition];

        // disable image transition
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
        }, 16);

        setTimeout(this.nextPic, 3000);
    }

    handleMouseDown(event) {
        let startX = event.clientX;
        let lastPosition = (this.position - 1 + this.data.length) % this.data.length;
        let nextPosition = (this.position + 1) % this.data.length;

        let current = this.children[this.position];
        let last = this.children[lastPosition];
        let next = this.children[nextPosition];

        // disable image transition
        current.style.transition = 'ease 0s';
        last.style.transition = 'ease 0s';
        next.style.transition = 'ease 0s';

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
            let offset = 0;
            if (event.clientX - startX > 250) {
                offset = 1;
            } else if (event.clientX - startX < -250) {
                offset = -1;
            }

            // open img transition
            current.style.transition = '';
            last.style.transition = '';
            next.style.transition = '';

            current.style.transform = `translateX(${offset * 500 - 500 * this.position}px)`;
            last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;
            next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;

            this.position = (this.position - offset + this.data.length) % this.data.length;

            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('selectstart', disableSelect);
        };
        let disableSelect = event => event.preventDefault();

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
        document.addEventListener('selectstart', disableSelect);
    }

    play() {
        setTimeout(this.nextPic, 3000);
    }

    render() {
        const children = this.data.map(url => {
            let ele = <img src={url} />;
            ele.addEventListener('dragstart', e => e.preventDefault());
            return ele;
        });
        this.children = children;
        // this.play();

        return (
            <div class="carousel" onmousedown={this.handleMouseDown}>
                {children}
            </div>
        );
    }

    mountTo(parent) {
        this.render().mountTo(parent);
    }
}