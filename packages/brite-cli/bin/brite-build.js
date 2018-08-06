#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const { version } = require('../package.json');

let briteconfig;
let brite;

try {
    brite = require(path.join(process.cwd(), 'package.json'));
} catch(e) {}

try {
    briteconfig = require(path.join(process.cwd(), 'briteconfig.js'));
} catch(e) {}


program
  .version(version)
  .description('Build stuff')
  .parse(process.argv);

if (!brite && !briteconfig) {
    throw new Error('Must have brite in package.json or a briteconfig');
}

console.log("Running a build...");