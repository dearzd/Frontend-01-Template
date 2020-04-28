function numberToString(num, radix = 10) {
    let symbol = '';
    if (num < 0) {
        symbol = '-';
        num = -num;
    }
    let integer = Math.floor(num);
    let fraction = num - integer;
    let string = '';
    while (integer > 0) {
        string = String(integer % radix) + string;
        integer = Math.floor(integer / radix);
    }

    if (fraction > 0) {
        string += '.';
    }

    while (fraction > 0) {
        const integerPosition = Math.floor(fraction * radix);
        string += String(integerPosition);
        fraction = fraction * radix - integerPosition;
    }

    string = symbol + string;

    return string;
}

console.log(numberToString(100));
console.log(numberToString(-100));
console.log(numberToString(100, 8));
console.log(numberToString(100.2));
console.log(numberToString(100.2, 8));