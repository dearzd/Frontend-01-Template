import {createElement} from './createElement';

export default class TabPanel {
    constructor() {
        this.children = [];
    }

    setAttribute(name, value) { // attribute
        this[name] = value;
    }

    getAttribute(name) {
        return this[name];
    }

    appendChild(child) {
        this.children.push(child);
    }

    select(i) {
        for (let view of this.childViews) {
            view.style.display = 'none';
        }

        this.childViews[i].style.display = '';

        for (let view of this.titleViews) {
            view.classList.remove('selected');
        }
        this.titleViews[i].classList.add('selected');
    }

    render() {
        this.childViews = this.children.map(child => <div style="min-height: 300px;">{child}</div>);
        this.titleViews = this.children.map((child, i) => {
            return (
                <span
                    onClick={() => this.select(i)}
                    style="padding: 5px; margin: 0 4px; font-size: 20px; background: lightgreen;"
                >
                    {child.getAttribute('title')}
                </span>
            );
        })

        setTimeout(() => this.select(0), 16);

        return (
            <div class="panel" style="width: 300px;">
                <h1 style="margin: 0;">{this.titleViews}</h1>
                <div style=" border: 1px solid lightgreen;">
                    {this.childViews}
                </div>
            </div>
        );
    }

    mountTo(parent) {
        this.render().mountTo(parent);
    }
}