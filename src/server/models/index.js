var fs = require('fs');

var files = fs.readdirSync(__dirname);
var required = {};
var fileName;

files.forEach((file) => {
  if (file.indexOf('index') === -1) {
    fileName = file.replace(/\.js/, '');

    if (required[fileName] === undefined) {
      required[fileName] = require('./' + fileName);
    }
  }
});

module.exports = required;