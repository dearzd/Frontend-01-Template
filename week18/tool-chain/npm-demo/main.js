const npm = require('npm');

const config = {
    "name": "babel-test",
    "version": "1.0.0",
    "description": "",
    "main": "babelDemo.js",
    "scripts": {
        "babel": "babel babelDemo.js --out-file 1.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "@babel/cli": "^7.10.5",
        "@babel/core": "^7.11.1",
        "@babel/preset-env": "^7.11.0",
        "@vue/compiler-sfc": "^3.0.0-rc.5"
    }
};

npm.load(config, () => {
    npm.install('webpack', (err) => {
        console.log(err);
    });
});

console.log('npm');