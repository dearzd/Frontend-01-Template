const http = require('http');
const https = require('https');
const unzip = require('unzipper');

// Create an HTTP tunneling proxy
const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url.match(/^\/auth/)) {
        return auth(req, res);
    }

    if (!req.url.match(/^\/?/)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not okay, 404 not found');
        return;
    }

    const options = {
        hostname: 'api.github.com',
        port: 443,
        path: `/user`,
        method: 'GET',
        headers: {
            'Authorization': `token ${req.headers.token}`,
            'User-Agent': 'dearzd-toy-publish'
        }
    };

    const request = https.request(options, (response) => {
        // console.log('statusCode:', response.statusCode);
        // console.log('headers:', response.headers);

        let body = '';
        response.on('data', (d) => {
            body += d.toString();
        });
        response.on('end', () => {
            console.log(body);
            let user = JSON.parse(body);

            // 权限检查
            const writeStream = unzip.Extract({path: '../server/public'});
            req.pipe(writeStream);

            req.on('end', () => {
                console.log('req on end');
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('okay');
            });
        });
    });

    request.on('error', (e) => {
        console.error('error', e);
    });
    request.end();
});

function auth(req, res) {
    let code = req.url.match(/code=([^&]+)/)[1];

    let state = '123abc';
    let client_id = 'Iv1.3da096b94ac40ba3';
    let client_secret = 'e80ff1c8b1e544e0b5a983927b8a06351b493a7a';
    let redirect_uri = encodeURIComponent('http://localhost:8081/auth');

    let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    let url = `https://github.com/login/oauth/access_token?${params}`;

    const options = {
        hostname: 'github.com',
        port: 443,
        path: `/login/oauth/access_token?${params}`,
        method: 'POST',
    };

    const request = https.request(options, (response) => {
        // console.log('statusCode:', response.statusCode);
        // console.log('headers:', response.headers);

        response.on('data', (d) => {
            console.log(d.toString());
            let result = d.toString().match(/access_token=([^&]+)/);
            if (result) {
                let token = result[1];
                console.log(token);
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                    'access_token': token
                });
                res.end(`<a href="http://localhost:8080/publish?token=${token}">publish</a>`);
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('not okay');
            }
        });
    });

    request.on('error', (e) => {
        console.error('error', e);
    });
    request.end();
    // res.end('okay');
}

server.listen(8081);