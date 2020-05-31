const net = require('net');
const ResponseParser = require('./responseParser.js');
const HTMLParser = require('./HTMLParser.js');
const render = require('./render.js');

class Request {
    // method, url = host + port + path
    // body: k/v
    // headers
    constructor(options) {
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};

        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }

        this.headers['Content-Length'] = this.bodyText.length;
    }

    toString() {
        const headerString = Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n');
        return `${this.method} / HTTP/1.1\r\nHost: ${this.host}\r\n${headerString}\r\n\r\n${this.bodyText}\r\n`;
    }

    open(method, url) {

    }

    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser();
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString());
                });
            }

            connection.on('data', (data) => {
                //console.log(data.toString());
                parser.receive(data.toString());
                if (parser.isFinished) {
                    //console.log('finished');
                    resolve(parser.response);
                }
                //console.log(parser.statusLine);
                connection.end();
            });

            connection.on('error', (err) => {
                console.log('on error');
                reject(err);
                connection.end();
            });
        });
    }
}

void async function() {
    let request = new Request({
        method: 'GET',
        host: '127.0.0.1',
        port: '8088',
        path: '/',
        headers: {
            ['X-Foo2']: 'customed'
        },
        body: {
            name: 'dearzd'
        }
    });
    //console.log(request.toString());

    let response = await request.send();

    let dom = HTMLParser.parseHTML(response.body);

    render(dom);
    //console.log(response);
}();

/*
const client = net.createConnection({
    host: '127.0.0.1',
    port: 8088
}, () => {
    // 'connect' listener.
    console.log('connected to server!');
    client.write('GET / HTTP/1.1\r\n');
    client.write('Host: 127.0.0.1\r\n');
    client.write('Content-Length: 21\r\n');
    client.write('Content-Type: application/x-www-form-urlencoded\r\n');
    client.write('\r\n');
    client.write('field1=aaa&code=x%3D1\r\n');
    client.write('\r\n');
});
client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
client.on('end', () => {
    console.log('disconnected from server');
});*/
