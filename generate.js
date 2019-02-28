#!/usr/bin/env node

var convert = require('./code');

console.log(convert.generateValidHash(process.argv[2]));