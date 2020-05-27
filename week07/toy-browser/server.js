/*const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();

app.use('/', (req, res) => {
    const homePage = fs.readFileSync(path.resolve('./index.html'));
    res.type('html').send(homePage);
});

app.listen(8088, () => {
    console.log('Toy Browser on port 8088...')
});*/



const http = require('http');

const server = http.createServer((req, res) => {
    console.log('request received');
    //console.log(req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`<html maaa=a >
<head>
    <style>
        body div #myid{
            width:100px;
            background-color: #ff5000;
        }
        body div img{
            width:30px;
            background-color: #ff1111;
        }
        #container {
            display: flex;
            width: 500px;
            height: 300px;
            background-color: rgb(255, 255, 255);
        }
        #container #myId2 {
            width: 200px;
            background-color: rgb(255, 0, 0);
        }
        #container .c1 {
            flex: 1;
            background-color: rgb(0, 255, 0);
        }
    </style>
</head>
<body>
<div>
    <img id="myid"/>
    <img style="background-color: violet; height: 20px;" />
    <div id="container">
        <div id="myId2"></div>
        <div class="c1"></div>
    </div>
</div>
</body>
</html>`);
});

server.listen(8088);

/*
var xhr = new XMLHttpRequest();
xhr.open('get', 'http://127.0.0.1:8088', true);
xhr.send(null);
xhr.responseText;
xhr.HEADERS_RECEIVED;*/
