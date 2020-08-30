#!/usr/bin/env node

const { ESLint } = require("eslint");
const process = require('process');
const child_process = require('child_process');

function exec(command) {
    return new Promise(resolve => {
        child_process.exec(command, resolve);
    })
}

(async function() {

    console.log('hook is running');

    // 1. Create an instance.
    const eslint = new ESLint();

    // 2. Lint files.
    await exec('git stash save -q --keep-index');
    const results = await eslint.lintFiles(["./main.js"]);
    await exec('git stash pop');

    // 3. Format the results.
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    // 4. Output it.
    console.log(resultText);

    for (let result of results) {
        if (result.errorCount > 0) {
            process.exitCode = 1;
        }
    }

    // process.exit(1);

})().catch((error) => {
    process.exitCode = 1;
    console.error(error);
});