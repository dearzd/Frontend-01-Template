const css = require('css');

let rules = [];

function addCssRules(text) {
    let ast = css.parse(text);
    rules.push(...ast.stylesheet.rules);
}

function computeCSS(element, stack) {
    let elements = stack.slice().reverse();

    if (!element.computedStyle) {
        element.computedStyle = {};
    }

    for (let rule of rules) {
        let selectorParts = rule.selectors[0].split(' ').reverse();

        if (!match(element, selectorParts[0])) continue;

        let j = 1;
        for (let i = 0; i < elements.length; i++) {
            if (match(elements[i], selectorParts[j])) {
                j++;
                if (j === selectorParts.length) {
                    break;
                }
            }
        }

        let matched = false;

        if (j >= selectorParts.length) {
            matched = true;
        }

        if (matched) {
            //console.log('Element', element, 'matched', rule);
            let sp = specificity(rule.selectors[0]);
            let computedStyle = element.computedStyle;
            for (let declaration of rule.declarations) {
                const {property, value} = declaration;

                if (!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {
                        value: value,
                        specificity: sp
                    };
                } else if (compare(computedStyle[property].specificity, sp) < 0) {
                    computedStyle[property].value = declaration.value;
                    computedStyle[property].specificity = sp;
                }

            }
        }
    }

    const inlineStyle = element.attributes.find(attr => attr.name === 'style');
    if (inlineStyle) {
        let computedStyle = element.computedStyle;

        const parsedInlineStyle = css.parse('*{' + inlineStyle.value + '}');
        const inlineDeclarations = parsedInlineStyle.stylesheet.rules[0].declarations;
        let sp = [1, 0, 0, 0];
        for (let declaration of inlineDeclarations) {
            const {property, value} = declaration;
            if (!computedStyle[property]) {
                computedStyle[property] = {
                    value: value,
                    specificity: sp
                };
            } else if (compare(computedStyle[property].specificity, sp) < 0) {
                computedStyle[property].value = value;
                computedStyle[property].specificity = sp;
            }
        }
    }
}

function match(element, selector) {
    if (!selector || !element.attributes) return false;

    if (selector.charAt(0) === '#') {
        let attr = element.attributes.filter(attr => attr.name === 'id')[0];
        if (attr && attr.value === selector.replace('#', '')) {
            return true;
        }
    } else if (selector.charAt(0) === '.') {
        let attr = element.attributes.filter(attr => attr.name === 'class')[0];
        if (attr && attr.value === selector.replace('.', '')) {
            return true;
        }
    } else if (element.tagName === selector) {
        return true;
    }

    return false;
}

function specificity(selector) {
    let p = [0, 0, 0, 0];
    let selectorParts = selector.split(' ');
    for (let part of selectorParts) {
        if (part.charAt(0) === '#') {
            p[1]++;
        } else if (part.charAt(0) === '.') {
            p[2]++;
        } else {
            p[3]++;
        }
    }
    return p;
}

function compare(sp1, sp2) {
    const N = 10000;
    return Math.max(...[sp1, sp2].map(arr => {
        return arr.reduce((a, c, i) => {
            return a + c * Math.pow(N, arr.length - i - 1)
        }, 0);
    }));
}

module.exports = {
    addCssRules,
    computeCSS
};