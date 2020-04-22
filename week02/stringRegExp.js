function tesString(str) {
    const reg = /(^'(.*\n*\r*\u2028*\u2029*)*'$)|(^"(.*\n*\r*\u2028*\u2029*)*"$)/;
    return reg.test(str);
}

function expect(a, b) {
    if (tesString(a) === b) {
        console.log(a, 'pass');
    } else {
        console.log(a, 'failed, expect to ' + b, ', return ' + tesString(a));
    }
}

expect(`'123abc'`, true);
expect(`'12\n3abc'`, true);
expect(`'12\u20283abc'`, true);
expect(`'1'3abc'`, true);
expect(`"123abc"`, true);
expect(`'我'`, true);
expect(`'[]/]'`, true);
expect(`'\u0010'`, true);

