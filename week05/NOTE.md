# 每周总结可以写在这里

# 浏览器

http文档：https://tools.ietf.org/html/rfc2616



```http
POST / HTTP/1.1
Host: 127.0.0.1
Content-Type: application/x-www-form-urlencoded

field1=aaa&code=x%3D1
```

```http
HTTP/1.1 200 OK
Content-Type: text/plain
X-Foo: bar
Date: Sat, 09 May 2020 14:25:34 GMT
Connection: keep-alive
Transfer-Encoding: chunked

2
ok
0
```

