const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');

// Create an HTTP tunneling proxy
const server = http.createServer((req, res) => {
    /*let matched = req.url.match(/filename=([^&]+)/);
    let filename = matched && matched[1];
    console.log(filename);
    if (!filename) {
        return;
    }*/

    // const writeStream = fs.createWriteStream('../server/packages/package');
    const writeStream = unzip.Extract({path: '../server/public'});
    req.pipe(writeStream);

    // pipe is short write of below
    /*req.on('data', chunk => {
        writeStream.write(chunk);
    });
    req.on('end', thunk => {
        writeStream.end(thunk);
    });*/

    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('okay');
    });
});

server.listen(8081);