# 每周总结可以写在这里

# HTML

HTML 早年参考 SGML

SGML 是用 dtd 去定义语言，XML 是用 namespace 去定义语言。

```
https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
https://www.w3.org/1999/xhtml
```

```
<!ENTITY quot    "&#34;"> <!--  quotation mark, U+0022 ISOnum -->
<!ENTITY amp     "&#38;#38;"> <!--  ampersand, U+0026 ISOnum -->
<!ENTITY lt      "&#38;#60;"> <!--  less-than sign, U+003C ISOnum -->
<!ENTITY gt      "&#62;"> <!--  greater-than sign, U+003E ISOnum -->
```

## HTML语义

## HTML语法

合法元素

- Element
- Text
- Comment
- DocumentType
- ProcessingInstruction
- CDATA

Node：

- Element

## DOM

### DOM操作

导航类操作

- parentNode
- childNodes，childNodes是 living 的 api，修改了 DOM 树，会实时变化
- fiestChild
- lastChild
- nextSibling
- previousSibling

对应 Node 操作

- parentElement
- children
- nextElementSibling
- previousElementSibling
- firstElementChild



修改操作

- appendChild



高频操作

- compareDocumentPosition，比较两个节点中的关系
- contains，是否包含
- isEqualNode，检查两个节点是否完全相同
- isSameNode，检查是否是同一个节点（JS中用 === 就可以判断）
- cloneNode，复制节点，参数 true 决定可以深拷贝



### Event



# CSS Homework

```js
const styles = getComputedStyle(document.body);
const properties = Array.prototype.map.call(styles, value => value)
	.filter(value => value.indexOf('-webkit-') !== 0);
```

