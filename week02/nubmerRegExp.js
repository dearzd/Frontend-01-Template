// 0 1 2 ... 9
// +0 -0
// 4e2 4e-2
// 0.2 .2
// 0x
// 0b
// 0o
// Infinity
// NaN

function testNumber(str) {
    const reg = /(^(\+|-|\.)?[0-9]*((\.[0-9]*|e-?\+?[0-9]+)|(\.[0-9]*[0-9]+e-?\+?[0-9]+))?$)|(^0(x|X)([0-9]+|[a-f]+|[A-F]+)$)|(^0(b|B)([0-1]+)$)|(^0(o|O)([0-7]+)$)|Infinity|NaN/;
    return reg.test(str);
}

function expect(a, b) {
    if (testNumber(a) === b) {
        console.log(a, 'pass');
    } else {
        console.log(a, 'faild, expect to ' + b, ', return ' + testNumber(a));
    }
}

expect('-123', true);
expect('12.3', true);
expect('.3', true);
expect('3.', true);
expect('0.3', true);
expect('-.3', true);
expect('--.3', false);
expect('12..3', false);
expect('12.3.4', false);
expect('.123', true);
expect('12c3', false);
expect('12e3', true);
expect('12e', false);
expect('12e-308', true);
expect('1.7976931348623157e+308', true);
expect('12ee3', false);
expect('12e33e4', false);
expect('0x10', true);
expect('0X10', true);
expect('0xF', true);
expect('0xf', true);
expect('0xg', false);
expect('0b10', true);
expect('0B10', true);
expect('0b2', false);
expect('0o10', true);
expect('0O10', true);
expect('0o7', true);
expect('0o8', false);
expect('Infinity', true);
expect('NaN', true);