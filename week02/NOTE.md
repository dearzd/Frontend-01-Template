# 每周总结可以写在这里
# 第二周，1. 编程语言通识与 JavaScript 语言设计

### 语言按语法分类

非形式语言

- 

形式化语言

- 0型，无限制形文法
  - `?::=?`
- 1型，上下文相关文法
  - `?<A>?::=?<B>?`
- 2型，上下文无关文法
  - `<A>:==?`
- 3型，正则文法
  - `<A>::=<A>?`



### 产生式（BNF）

巴克斯诺尔范式编写带括号的简单四则运算示例：

```
<Number> ::= "0" | "1" | "2" | ... | "9"

<DecimalNumber> ::= "0" | (("1" | "2" | ... | "9") <Number>*)

<MultiplicativeExpression> ::= <DecimalNumber> | 
	<MultiplicationExpression> "*" <DecilamNumber> |
	<MultiplicationExpression> "/" <DecilamNumber>

<AdditiveExpression> ::= <MultiplicativeExpression> | 
	<AdditiveExpression> "+" <MultiplicativeExpression>
	<AdditiveExpression> "-" <MultiplicativeExpression>

<LogicalExpression> ::= <AddititiveExpression> | 
	<LogicalExpression> "||" <AdditiveExpression> |
	<LogicalExpression> "&&" <AdditiveExpression>
	
<PrimaryExpression> ::= <DecimalNumber> |
	"(" <LogicalExpression> ")"
```

### 图灵完备性



### 动态与静态

动态

- 在用户的设备 / 在线服务器上
- 产品实际运行时
- Runtime

静态

- 在程序员的设备上
- 产品开发时
- Compiletime



### 类型系统

动态类型系统和静态类型系统

强类型（无隐式转换）与弱类型（有隐式转换）

- String + Number
- String == Boolean

复合类型

- 结构体
- 函数签名

子类型

- 逆变 / 协变

### 一般命令式编程语言

Atom

- Identifier
- Literal

Expression

- Atom
- Operator
- Punctuator

Statement

- Expression
- Keyword
- Punctuator

Structure

- Function
- Class
- Process
- Namespace
- ...

Program

- Program
- Module
- Package
- Library


# 第二周，第二课

## [Unicode](http://www.fileformat.info/info/unicode)

0 - 128，兼容 ASCII码 128位

a 97，A 65

```html
<script>
    for (let i = 0; i < 128; i++) {
        console.log(String.fromCharCode(i));
    }

    for (let i = 0; i < 128; i++) {
        document.write(i + '<span style="background: violet;">' + String.fromCharCode(i) + '</span><br />');
    }

    // 不好，JS源码最好用兼容 ASCII 的128位写
    var 厉害 = '我是谁';
    console.log(厉害);

  	// 如果非得这样，有一种方式是在源码就自己辛苦点用 \u 转义
  	// 或者用一些工具转
    var \u5389\u5bb3 = '我是谁';
    console.log(厉害);
</script>
```



Emoji



## Javascript

### InputElement

#### Whitespace

`<TAB>`

Character Tabulation

`'\t'.codePointAt() === 9`

`<VT>`

Line Tabulation

纵向的 tab，`'\v'`

`<FF>`

Form feed，10

`'var\uFEFFa = 1'`

`<SP>`

Space, 普通空格，32

`<NBSP>`

No-break space

```html
&nbsp; 表示的是 no-break space，一般的用法可能是错的，它主要除了空格的效果，还自带no beak换行效果。
例如：I leaned JavaScript today. 在屏幕很小的时候，默认换行只在空格处换行。
如果这时候想在 Java 和 Script 中间插一个空格，并且不希望它被换行，被当做一个词处理，就可以这么用：
I leaned Java&nbsp;Script today.
```

`<ZWNBSP>`

Zero with no-break space

`<USP>`

Any other Unicode "Space_Separator" code point.

BOM

主要是这里，Unicode的空格都支持，上面5中有一部分也是Unicode的，单独拎出来特殊讲一下。

#### LineTerminator

`<LF>`

U+000A, \n, 10

`<CR>`

U+000D, \r, 13

`<LS>`

后面这两种最好不要用

`<PS>`

#### Comment

`'*'.codePointAt(0).toString(16) === '2a'`

#### Token

Punctuator

IdentifierName

​	Keywords

​	Idenfitier

​	Future resolved Keywords

```js
//undefined 是一个运行时的全局变量
//在全局作用于下不能被修改，
//离开全局作用于，在函数作用于下是可以修改的。
var undefined = 3;
function f() {
  var undefined = 3;
  console.log(undefined);
}
```



#### Literal

##### Numer

IEEE 754 Double Float

- Sign (1)
- Exponent ()
- Fraction (52)

```js
var a = 0.1;
var b = 0.2;

const intArr = new Uint8Array(8);

const memory = new Float64Array(intArr.buffer);
intArr[0] = 0b00000000;
intArr[0] = 0b00001000;
//memory[0] = a;

for (let i = 0; i < 8; i++) {
  console.log(intArr[i].toString(2));
  console.log(' ');
}

//console.log(intArr);

//console.log(memory);
```

Number - Grammer



0b, 2进制 0b001

0o, 8进制 0o11

0x, 16进制 0x111



```js
0.1 + 0.2 - 0.3 <= Number.EPSILON
```



##### String

Character

Code Point

Encoding

- ASCII
- Unicode
- USC
- GB
  - GB2312
  - GBK(G13 000)
  - GB18030
- ISO-8859
- BIG5

String - Grammar

`"abc"`

`'abc'`

``abc``

Homework

1. 写一个正则来匹配 JS 中所有的 Number
2. 写一个正则表达式匹配除了第三种的 String