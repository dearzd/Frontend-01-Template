import {enableGesture} from '../../gesture/gesture';

export default class Wrapper {
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value) { // attribute
        if (name === 'enableGesture') {
            enableGesture(this.root);
        } else if (name.match(/^on([\s\S]+)$/)) {
            // console.log(RegExp.$1);
            let eventName = RegExp.$1.replace(/^[\s\S]/, (s) => s.toLowerCase());
            // console.log(eventName, value);
            this.root.addEventListener(eventName, value);
        } else {
            this.root.setAttribute(name, value);
        }
    }

    appendChild(child) { // children
        this.children.push(child);
    }

    addEventListener() {
        this.root.addEventListener(...arguments);
    }

    get style() {
        return this.root.style;
    }

    mountTo(parent) {
        parent.appendChild(this.root);
        for (let child of this.children) {
            child.mountTo(this.root);
        }
    }
}