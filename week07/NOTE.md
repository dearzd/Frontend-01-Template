# 每周总结可以写在这里

## CSS总体结构

- @charset

- @import

- rules
  - @media
  - @page
  - Rule



> @charset
>
> ​	https://www.w3.org/TR/css-syntax-3/
>
> @import
>
> ​	https://www.w3.org/TR/css-cascade-4
>
> @namespace
>
> ​	https://www.w3.org/TR/css-namespaces-3/
>
> @media
>
> ​	https://www.w3.org/TR/css3-conditional/	
>
> @page
>
> ​	https://www.w3.org/TR/css-page-3/
>
> @supports
>
> ​	https://www.w3.org/TR/css3-conditional/	
>
> @document (deferred to level 4)
>
> @font-face
>
> ​	https://www.w3.org/TR/css-fonts-3/
>
> @keyframes
>
> ​	https://www.w3.org/TR/css-animations-1/
>
> @viewport
>
> @counter-style
>
> ​	https://www.w3.org/TR/css-counter-styles-3/
>
> @font-feature-values



## selector

> https://www.w3.org/TR/selectors-3/

## Declaration

Property, Value

> https://www.w3.org/TR/css-values-4/

## 实验 - 收集标准

把 w3.org 的所有的 css 标准以及 url 都手机下来

```js
const container = document.getElementById('container');
const standards = Array.prototype.filter.call(container.children, node => {
    return node.getAttribute('data-tag') === 'css';
}).map(node => {
    const name = node.querySelector('h2 a').innerText;
    const url = node.querySelector('h2 a').getAttribute('href');
    const status = node.querySelector('.profile').innerText;
    return {name, url, status};
});


const iframe = document.createElement('iframe');
document.body.innerHTML = '';
document.body.appendChild(iframe);


function happen(element, event) {
    return new Promise(resolve => {
        const clalback = () => {
            resolve();
            element.removeEventListener(event, clalback);
        };
        element.addEventListener(event, clalback);
    });
}

// const standards = [{
//     name: "List of suggested extensions to CSS",
//     status: "ret",
//     url: "http://www.w3.org/TR/1998/NOTE-CSS-potential-19981210"
// }];
void async function() {
    for (let sd of standards) {
        iframe.src = sd.url;
        await happen(iframe, 'load');
    }
}();
```

