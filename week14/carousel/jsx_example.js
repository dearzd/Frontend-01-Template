function createElement(Cls, attributes, ...children) {
    let o;
    if (typeof Cls === 'string') {
        o = new Wrapper(Cls);
    } else {
        o = new Cls();
    }

    for (let name in attributes) {
        // o[name] = attributes[name];
        o.setAttribute(name, attributes[name]);
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
            o.appendChild(child);
            // o.children.push(child);
        }
    };

    visit(children);

    return o;
}

class Wrapper {
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value) { // attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child) { // children
        this.children.push(child);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
        for (let child of this.children) {
            console.log(child);
            child.mountTo(this.root);
        }
    }
}

class Text {
    constructor(text) {
        this.root = document.createTextNode(text);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class MyComponent {
    constructor() {
        this.attribute = new Map();
        this.children = [];
    }

    setAttribute(name, value) { // attribute
        this.attribute.set(name, value);
    }

    appendChild(child) { // children
        this.children.push(child);
    }

    render() {
        return (
            <article>
                <header>I'm a header</header>
                {this.children.map(child => child)}
                <footer>I'm a footer</footer>
            </article>
        );
    }

    mountTo(parent) {
        this.render().mountTo(parent);
    }
}

let component = (
    <MyComponent>
        <div id="a" class="c" style="width: 100px; height: 100px; background: violet;" >
            abc
            <span>
                <article style="color: white;">this is an article</article>
            </span>
        </div>
    </MyComponent>
);

component.mountTo(document.body);