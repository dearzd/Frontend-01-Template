# 每周总结可以写在这里

# Event Loop

```js
async function afoo(){
    console.log("-2")

    await new Promise(resolve => resolve());
    console.log("-1")
}


new Promise(resolve => (console.log("0"), resolve()))
    .then(()=>(
        console.log("1"), 
        new Promise(resolve => resolve())
            .then(() => console.log("1.5")) ));


setTimeout(function(){
    console.log("2");
    
    new Promise(resolve => resolve()) .then(console.log("3"))


}, 0)
console.log("4");
console.log("5");
afoo()
```

浏览器里面只有 Promise 和 MutitionObserver 能产生微任务。

