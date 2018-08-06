#!/usr/bin/env node
const program = require('commander');
const { version } = require('../package.json');

program
  .version(version)
  .command('start [name]', 'run an app with a set preset')
  .command('build [query]', 'build an app')
  .command('test [query]', 'run tests')
  .parse(process.argv);