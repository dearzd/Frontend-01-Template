const images = require("images");

function draw(viewPort, element) {
    if (element.style) {
        let img = images(element.style.width, element.style.height);

        if (element.style['background-color']) {
            let color = element.style['background-color'] || 'rgb(0, 0, 0)';
            color.match(/rgb\((\d+), (\d+), (\d+)\)/);
            img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3));
            viewPort.draw(img, element.style.left || 0, element.style.top || 0);
        }
    }

    if (element.children) {
        element.children.forEach(child => {
            draw(viewPort, child);
        });
    }
}

function render(dom) {
    let viewPort = images(800, 600);
    draw(viewPort, dom.children[0].children[3].children[1].children[5]);
    viewPort.save('image.jpg');
}

module.exports = render;