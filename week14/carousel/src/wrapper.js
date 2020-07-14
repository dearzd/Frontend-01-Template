export default class Wrapper {
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value) { // attribute
        if (typeof value === 'function') {
            this.root.addEventListener(name.toLocaleLowerCase().replace(/^on/, ''), value);
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