function stringToNumber(str, radix = 10) {
    const chars = str.split('');
    let number = 0;
    let i = 0;
    let symbol = 1;
    if (chars[0] === '+') {
        i++;
    } else if (chars[0] === '-') {
        symbol = 0;
        i++;
    }

    while (i < chars.length && validNumber(chars[i])) {
        number = number * radix;
        number += chars[i].codePointAt(0) - 48;
        i++;
    }

    if (chars[i] === '.') {
        i++;
        const result = toFraction(number, chars, radix, i);
        number = result.number;
        i = result.i;
    }

    if (chars[i] === 'e') {
        i++;
        number = toExponent(number, chars, radix, i).number;
    }

    if (!symbol) {
        number = 0 - number;
    }

    return number;
}

function toFraction(number, chars, radix, i) {
    let fraction = 1;
    while (i < chars.length && validNumber(chars[i])) {
        fraction = fraction / radix;
        number += (chars[i].codePointAt(0) - 48) * fraction;
        i++;
    }
    return {number, i};
}

function toExponent(number, chars, radix, i) {
    let exponent = 0;
    while (i < chars.length && validNumber(chars[i])) {
        exponent = exponent * radix + chars[i].codePointAt(0) - 48;
        i++;
    }

    number *= Math.pow(radix, exponent);

    return {number, i};
}

function validNumber(n) {
    return n.codePointAt(0) - 48 >= 0 && n.codePointAt(0) - 48 <= 9;
}

console.log(stringToNumber('10.123'));
console.log(stringToNumber('-10.123'));
console.log(stringToNumber('10.123', 8));
console.log(stringToNumber('10', 2));
console.log(stringToNumber('10e4'));
console.log(stringToNumber('0.1e4'));