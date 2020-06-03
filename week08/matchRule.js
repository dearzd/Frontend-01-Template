function matchRule(element, rule) {
    const selectors = rule.selectors[0].split(' ').reverse();

    if (!match(element, selectors[0])) return false;

    let parent = element.parentNode;
    let i = 1;
    while (parent) {
        if (match(parent, selectors[i])) {
            i++;
            if (i === selectors.length) break;
        }
        parent = parent.parentNode;
    }

    return i >= selectors.length;
}

function match(element, selector) {
    if (!selector || !element.attributes) return false;

    const {tagName, attributes} = element;

    // Type selector
    if (tagName === selector) return true;

    // Universal selector
    if (selector === '*') return true;

    // Id selector
    if (selector.indexOf('#') >= 0) {
        let id = attributes.find(attr => attr.name === 'id');
        id = id && id.value;
        if (id === selector.replace('#', '')) return true;
    }

    // Class selector
    if (selector.indexOf('.' >= 0)) {
        let className = attributes.find(attr => attr.name === 'class');
        className = className ? className.value.split(' ') : [];
        if (className.indexOf(selector.replace('.', '')) >= 0) return true;
    }

    return false;
}