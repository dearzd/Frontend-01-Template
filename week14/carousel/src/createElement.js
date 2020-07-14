import Wrapper from './wrapper';
import Text from './text';

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
            obj.appendChild(child);
        }
    };

    visit(children);

    return obj;
}
