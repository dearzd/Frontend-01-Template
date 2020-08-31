const http = require('http');
const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process');

let packname = './package';

let redirect_uri = encodeURIComponent('http://localhost:8081/auth');
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.3da096b94ac40ba3&redirect_uri=${redirect_uri}&user=read%3Auser&state=123abc`);

const server = http.createServer((req, res) => {
    let token = req.url.match(/token=([^&]+)/)[1];
    console.log(token);
    console.log('real publish!!');

    const options = {
        host: 'localhost',
        port: 8081,
        path: '/?filename=' + 'package.zip',
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'token': token
        }
    };

    const request = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    });

    request.on('error', (e) => {
        console.log('problem with request: ' + e.message);
    });

    var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
    archive.directory(packname, false);
    archive.finalize();
    archive.pipe(request);

    archive.on('end', () => {
        request.end();
        console.log('Publish success');
        server.close();
    });
});

server.listen(8080);

/*

const options = {
    host: '127.0.0.1',
    port: 8081,
    path: '/?filename=' + 'package.zip',
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream'/!*,
            'Content-Length': stat.size*!/
    }
};

var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});
archive.directory(packname, false);
archive.finalize();

// Make a request
const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});

req.on('error', (e) => {
    console.log('problem with request: ' + e.message);
});

archive.pipe(req);

archive.on('end', () => {
   req.end();
   let redirect_uri = encodeURIComponent('http://localhost:8081/auth');
   child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.3da096b94ac40ba3&redirect_uri=${redirect_uri}&user=read%3Auser&state=123abc`);
});
*/

