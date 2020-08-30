const http = require('http');
const fs = require('fs');
const archiver = require('archiver');

let packname = './package';

// let filename = 'cat.jpg';
// fs.stat(filename, (err, stat) => {
const options = {
    host: '127.0.0.1',
    port: 8081,
    path: '/?filename=' + 'package.zip',
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream'/*,
            'Content-Length': stat.size*/
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

/*let readStream = fs.createReadStream(filename);
readStream.pipe(req);
readStream.on('end', () => {
    req.end();
});*/
// });
