const parser = require('./parser');
module.exports = function(source) {
    console.log('my loader is running...');
    const tree = parser.parseHTML(source);
    // console.log(tree.children[1].children[0].content);

    let template = null
    let script = null;

    for (let node of tree.children) {
        if (node.tagName === 'template') {
            template = node.children[1];
        } else if (node.tagName === 'script') {
            script = node.children[0].content;
        }
    }

    // console.log(template);

    let createCode = '';

    let visit = (node) => {
        if (node.type === 'text') {
            return JSON.stringify(node.content);
        }

        let attrs = {};
        for (let attr of node.attributes) {
            attrs[attr.name] = attr.value;
        }
        let children = node.children.map(node => visit(node));
        return `createElement('${node.tagName}', ${JSON.stringify(attrs)}, ${children})`;
    };

    let r = `
    import {createElement} from './createElement';
    export default class Carousel {
        setAttribute(name, value) { // attribute
            this[name] = value;
        }
        render() {
            return ${visit(template)};
        }
        mountTo(parent) {
            this.render().mountTo(parent);
        }
    }
    `;

    console.log(r);

    return r;
}