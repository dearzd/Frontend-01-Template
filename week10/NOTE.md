# 每周总结可以写在这里

# DOM API

元素逆序：

```html
<div id="app">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
</div>
<script>
    void function() {
        let app = document.getElementById('app');
        let len = app.children.length;
        for (let i = 0; i < len; i++) {
            app.appendChild(app.children[len - i - 1]);
        }
    }();
  
  	void function() {
        let app = document.getElementById('app');
        let len = app.childNodes.length;
        while (--len >= 0) {
            app.appendChild(app.childNodes[len]);
        }
    }();
</script>
```

Range API:

```js
		void function() {
        let app = document.getElementById('app');
      
        let range = new Range();
        range.selectNodeContents(app);
        let fragment = range.extractContents();
      
        let len = fragment.childNodes.length;
        while (--len >= 0) {
            fragment.appendChild(fragment.childNodes[len]);
        }
      
        app.appendChild(fragment);
    }();
```

CSSOM:

