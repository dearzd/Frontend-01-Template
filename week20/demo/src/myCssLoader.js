let css = require('css');

module.exports = function (source, map) {
    let name = this.resourcePath.match(/([^/]+).css/)[1];
    console.log(name);

    let stylesheet = css.parse(source);
    // console.log(stylesheet.stylesheet);

    for (let rule of stylesheet.stylesheet.rules) {
        // console.log(rule);
        rule.selectors = rule.selectors.map(selector => {
            return selector.match(new RegExp(`^.${name}`)) ? selector : `.${name} ${selector}`;
        });
    }

    console.log(css.stringify(stylesheet));
    return `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(css.stringify(stylesheet))};
        document.head.appendChild(style);
    `;
};