# 每周总结可以写在这里

# 第三周，第一课，表达式 Expression

### Member

- a.b
- a[b]
- foo`string`
- super.b
- super['b']

- new.target // 可以判断当前函数是不是被 new 调用的
- new Foo()

优先级：`new new Foo() === new (newFoo())`

### call

- foo()
- super()
- foo()['b']
- foo().b
- foo()`abc`

优先级：

`new foo()['b'] === (new foo())['b']`

`new foo['b'] === new (foo['b'])`



### Left Handside & Right Handside



### Update

- a ++
- a --
- ++ a
- -- a

### Unary

- Delete a.b
- void foo()
- typeof a
- `+ a`
- `- a`
- `~a`
- `! a`
- `await a`

### Exponental

**

### Multiplicative

- */%

### Additive

- */

### Shift

- <<>> >>>

### Relationship

- <> <= > >= instanceof in

### Equality

- ==
- !=
- ===
- !==

### Biewise



### Logical

- &&
- ||



### Boxing and Unboxing

toPrimitive

toString valueOf

// Symbol.toPrimitive



### Exercise

numberToString

stringToNuber

# 语句 Statement, 对象 Object

## Statement

### Grammar

- 简单语句

- 组合语句

- 声明

### Runtime

- Completion Record
- Lexical Environment

### Completion Record

[[type]]: normal, break, continue, return, or throw

[[value]]: Types

[[target]]: label



### 简单语句

- ExpressionStatement
- EmptyStatement
- DebuggerStatement
- ThrowStatement
- ContinueStatement
- BreakStatement
- ReturnStatement

### 复合语句

- BlockStatement
- IfStatement
- SwitchStatement
- IteratoinStatement (For, While, do wile)
- WithStatement



### 声明语句

- FunctionDeclaration
- GeneratorDeclaration
- AsyncFunctionDeclaration
- AsyncGeneratorDeclaration
- VariableStatement
- ClassDeclaration
- LexicalDeclaration



```js
var x = 0;
function foo() {
  var o = {x: 1};
  x = 2;
  with(o) {
    // var x = 3;
    x = 3;
  }
  console.log(x);
}

foo();
console.log(x);
```

## Object

对象三要素：Identifier (唯一性), State (状态), Behavior (行为)

Cass-basd

归类（可以继承，例如C++），分类（不能多继承，例如Java）

Prototype-based



JS 里有哪些对象是特殊的，我们没法模拟实现的，其特性。



```js
/\"(?:[^"\\n\r\u2028\u2029"]|\\u[0-9a-fA-F]{4}|)+\"/
```

