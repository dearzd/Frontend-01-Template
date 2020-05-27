function layout(element) {
    if (!element.computedStyle) return;

    let elementStyle = getStyle(element);

    if (elementStyle.display !== 'flex') return;

    let items = element.children.filter(item => item.type === 'element');

    items.sort((a, b) => {
       return (a.order || 0) - (b.order || 0);
    });

    ['width', 'height'].forEach(size => {
        if (elementStyle[size] === 'auto' || elementStyle[size] === '') {
            elementStyle[size] = null;
        }
    });

    // set default property
    if (!elementStyle.flexDirection || elementStyle.flexDirection === 'auto') {
        elementStyle.flexDirection = 'row';
    }
    if (!elementStyle.alignItems || elementStyle.alignItems === 'auto') {
        elementStyle.alignItems = 'stretch';
    }
    if (!elementStyle.justifyContent || elementStyle.justifyContent === 'auto') {
        elementStyle.justifyContent = 'flex-start';
    }
    if (!elementStyle.flexWrap || elementStyle.flexWrap === 'auto') {
        elementStyle.flexWrap = 'nowrap';
    }
    if (!elementStyle.alignContent || elementStyle.alignContent === 'auto') {
        elementStyle.alignContent = 'stretch';
    }

    // set direction axis
    let mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd, crossSign, crossBase;

    if (elementStyle.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }

    if (elementStyle.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = elementStyle.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }

    if (elementStyle.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if (elementStyle.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = -1;
        mainBase = elementStyle.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if (elementStyle.flexWrap === 'wrap-reverse') {
        const temp = crossStart;
        crossStart = crossEnd;
        crossEnd = temp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = +1;
    }

    let isAutoMainSize = false;
    if (!elementStyle[mainSize]) {
        elementStyle[mainSize] = 0;
        items.forEach(item => {
            let itemStyle = getStyle(item);
            if (itemStyle[mainSize] !== null && itemStyle[mainSize] !== void 0) {
                elementStyle[mainSize] += itemStyle[mainSize];
            }
        });
        isAutoMainSize = true;
    }

    // divide items to flex lines
    let flexLine = [];
    let flexLines = [flexLine];
    let mainSpace = elementStyle[mainSize];
    let crossSpace = 0;

    items.forEach(item => {
        let itemStyle = getStyle(item);
        if (itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0;
        }

        if (itemStyle.flex) {
            flexLine.push(item);
        } else if (elementStyle.flexWrap === 'nowrap' && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize];
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            flexLine.push(item);
        } else {
            if (itemStyle[mainSize] > elementStyle[mainSize]) {
                itemStyle[mainSize] = elementStyle[mainSize];
            }
            if (mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSize;
                flexLine.crossSpace = crossSpace;

                flexLine = [item];
                flexLines.push(flexLine);

                mainSpace = element[mainSize];
                crossSpace = 0;
            } else {
                flexLine.push(item);
            }
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            mainSpace -= itemStyle[mainSize];
        }
    });
    flexLine.mainSpace = mainSpace;

    if (elementStyle.flexWrap === 'nowrap' || isAutoMainSize) {
        flexLine.crossSpace = elementStyle[crossSize] !== void 0 ? elementStyle[crossSize] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }

    // compute main axis
    if (mainSize < 0) {
        const scale = elementStyle[mainSize] / (elementStyle[mainSize] - mainSpace);
        let currentMain = mainBase;
        items.forEach(item => {
            let itemStyle = getStyle(item);

            if (itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;

            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        });
    } else {
        flexLines.forEach(flexLine => {
            let mainSpace = flexLine.mainSpace;
            let flexTotal = 0;

            items.forEach(item => {
                let itemStyle = getStyle(item);

                if (itemStyle.flex !== null && itemStyle.flex !== void 0) {
                    flexTotal += itemStyle.flex;
                }
            });

            if (flexTotal > 0) {
                let currentMain = mainBase;
                flexLine.forEach(item => {
                    let itemStyle = getStyle(item);

                    if (itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }

                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd];
                })
            } else {
                let currentMain;
                let step;
                if (elementStyle.justifyContent === 'flex-start') {
                    currentMain = mainBase;
                    step = 0;
                } else if (elementStyle.justifyContent === 'flex-end') {
                    currentMain = mainSpace * mainSign + mainBase;
                    step = 0;
                } else if (elementStyle.justifyContent === 'center') {
                    currentMain = mainSpace / 2 * mainSign + mainBase;
                    step = 0;
                } else if (elementStyle.justifyContent === 'space-between') {
                    currentMain = mainSpace;
                    step = mainSpace / (items.length - 1) * mainSign;
                } else if (elementStyle.justifyContent === 'space-around') {
                    step = mainSpace / items.length * mainSign;
                    currentMain = step / 2 + mainBase;
                }
                items.forEach(item => {
                    let itemStyle = getStyle(item);
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd];
                });
            }
        });

    }

    // compute cross axis
    // let crossSpace;

    if (!elementStyle[crossSize]) {
        crossSpace = 0;
        elementStyle[crossSize] = 0;
        flexLines.forEach(flexLine => {
            elementStyle[crossSize] = elementStyle[crossSize] + flexLine.crossSpace;
        });
    } else {
        crossSpace = elementStyle[crossSize];
        flexLines.forEach(flexLine => {
            crossSpace -= flexLine.crossSpace;
        });
    }

    if (elementStyle.flexWrap === 'wrap-reverse') {
        crossBase = elementStyle[crossSize];
    } else {
        crossBase = 0;
    }

    let lineSize = elementStyle[crossSize] / flexLines.length;

    let step;
    if (elementStyle.alignContent === 'flex-start') {
        crossBase += 0;
        step = 0;
    } else if (elementStyle.alignContent === 'flex-end') {
        crossBase += crossSign * crossSpace;
        step = 0;
    } else if (elementStyle.alignContent === 'center') {
        crossBase += crossSign * crossSpace / 2;
        step = 0;
    } else if (elementStyle.alignContent === 'space-between') {
        crossBase += 0;
        step = crossSpace / (flexLines.length - 1);
    } else if (elementStyle.alignContent === 'space-around') {
        step = crossSpace / flexLines.length;
        crossBase += crossSign * step / 2;
    } else if (elementStyle.alignContent === 'stretch') {
        crossBase += 0;
        step = 0;
    }

    flexLines.forEach(flexLine => {
        let lineCrossSize = elementStyle.alignContent === 'stretch' ?
            flexLine.crossSpace + crossSpace / flexLines.length :
            flexLine.crossSpace;

        flexLine.forEach(item => {
            let itemStyle = getStyle(item);

            let align = itemStyle.alignSelf || elementStyle.alignItems;

            if (itemStyle[crossSize] === null) {
                itemStyle[crossSize] = align === 'stretch' ? lineCrossSize : 0;
            }

            if (align === 'flex-start') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] * crossSign * itemStyle[crossSize];
            } else if (align === 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            } else if (align === 'center') {
                itemStyle[crossStart] = crossBase * crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            } else if (align === 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) ? itemStyle[crossSize] : lineCrossSize);
                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
            }
        });
        crossBase += crossSign * (lineCrossSize + step);
    });

}

function getStyle(element) {
    element.style = element.style || {};

    for (let property in element.computedStyle) {
        element.style[property] = element.computedStyle[property].value;

        if (element.style[property].toString().match(/px$/)) {
            element.style[property] = parseInt(element.style[property]);
        }

        if (element.style[property].toString().match(/^[0-9\.]+$/)) {
            element.style[property] = parseInt(element.style[property]);
        }
    }

    return element.style;
}

module.exports = layout;