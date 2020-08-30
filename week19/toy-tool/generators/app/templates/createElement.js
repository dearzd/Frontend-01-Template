import {enableGesture} from './gesture';

export function createElement(Cls, attributes, ...children) {
    let obj;
    if (typeof Cls === 'string') {
        obj = new Wrapper(Cls);
    } else {
        obj = new Cls();
    }

    for (let name in attributes) {
        obj.setAttribute(name, attributes[name]);
    }

    let visit = (children) => {
        for (let child of children) {
            if (Array.isArray(child)) {
                visit(child);
                continue;
            }
            if (typeof child === 'string') {
                child = new Text(child);
            }
            if (child !== null && child !== undefined && child !== '') {
                obj.appendChild(child);
            }
        }
    };

    visit(children);

    return obj;
}

export class Wrapper {
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

    getAttribute(name) {
        return this.root.getAttribute(name);
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

    get classList() {
        return this.root.classList;
    }

    set innerText(text) {
        return this.root.innerText = text;
    }

    mountTo(parent) {
        parent.appendChild(this.root);
        for (let child of this.children) {
            child.mountTo(this.root);
        }
    }
}

export class Text {
    constructor(text) {
        this.root = document.createTextNode(text);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}