const fsevents = require('fsevents');
// const webpack = require('webpack');
// const httpServer = require('http-server');
const path = require('path');

const {exec} = require('child_process');

// exec('http-server');

console.log('start', path.resolve(__dirname, './src'));

const stop = fsevents.watch(__dirname, (path, flags, id) => {
    const info = fsevents.getInfo(path, flags, id);

    console.log('webpack', info);

    // exec('npm run webpack');

    // stop(); // To end observation
}); // To start observation



/*
const fsevents = require('fsevents');
const stop = fsevents.watch(__dirname, (path, flags, id) => {
    const info = fsevents.getInfo(path, flags, id);
    console.log(info);
    // stop(); // To end observation
}); // To start observation
*/
