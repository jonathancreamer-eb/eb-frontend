#! /usr/bin/env node
require("ts-node/register");
const path = require("path");

let briteconfig;
let brite;

try {
    const pkg = require(path.join(process.cwd(), 'package.json'));
    brite = pkg.brite;
} catch(e) {
    console.log(e);
}

try {
    briteconfig = require(path.join(process.cwd(), 'briteconfig.js'));
} catch(e) {}

require("../dist/start").init({
    ...brite,
    ...briteconfig,
});