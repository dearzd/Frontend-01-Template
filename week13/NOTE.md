# 每周总结可以写在这里
## 对象与组件

对象



组件

- Properties
- Methods
- Inherit
- Attribute
- Config



Attribute VS Property

Attribute 强调描述性

Property 强调从属关系



```html
Attribute:
<MyComponent a="a" />
domNode.getAttribute('a');

Property:
obj.a = 'a';
```

```html
<a href="//m.taobao.com"></div>

<script>
  let a = document.getElementByTabName('a');
  a.href; // 'http://m.taobao.com', 是 resolve 过后的
  a.getAttribute('href'); // 'm.taobao.com'，是原始值
</script>
```

```html
<input value="cute" />
<script>
    let cute = document.getElementByTagName('input');
  input.value; // cute
  input.getAttribute('value'); // cute
  input.value = 'hello';
  input.value; // hello
  input.getAttribute('value'); // cute
</script>
```



React 里面 Attribute 和 Property 是一回事，Vue 里面要区分。



## 如何设计组件状态？

| Markup Set | JS Set | JS Change | User Input Change |           |
| ---------- | ------ | --------- | ----------------- | --------- |
| ❌          | ✔️      | ✔️         | ?                 | Property  |
| ✔️          | ✔️      | ✔️         | ?                 | Attribute |
| ❌          | ❌      | ❌         | ✔️                 | State     |
| ❌          | ✔️      | ❌         | ❌                 | Config    |

