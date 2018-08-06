#!/usr/bin/env node
const program = require('commander');
const { version } = require('../package.json');

program
  .version(version)
  .description('Run unit tests')
  .parse(process.argv);

console.log("Running tests...");