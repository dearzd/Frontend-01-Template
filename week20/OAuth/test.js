// publish-tool 唤起浏览器
//https://github.com/login/oauth/authorize?client_id=Iv1.3da096b94ac40ba3&redirect_uri=http%3A%2F%2Flocalhost%3A8080&user=read%3Auser&state=123abc

// publish-server 服务器
{
    let code = 'fd88d5cfe0dfd7d28d1a';
    let state = '123abc';
    let client_id = 'Iv1.3da096b94ac40ba3';
    let client_secret = 'e80ff1c8b1e544e0b5a983927b8a06351b493a7a';
    let redirect_uri = encodeURIComponent('http://localhost:8080');

    let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

    let xhr = new XMLHttpRequest();
    xhr.open('post', `https://github.com/login/oauth/access_token?${params}`, true);
    xhr.send(null);

    xhr.addEventListener('readystatechange', function(event) {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    });
}

let access_token='a5d85f73a83b2934ec7c62506151671ccfd7d5e3';

// publish-tool / publish-server 客户端 服务端
{
    let xhr = new XMLHttpRequest();
    xhr.open('get', `https://api.github.com/user`, true);
    xhr.setRequestHeader('Authorization', `token ${access_token}`);
    xhr.send(null);

    xhr.addEventListener('readystatechange', function(event) {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    });
}