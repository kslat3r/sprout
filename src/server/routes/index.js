var fs = require('fs');

var files = fs.readdirSync(__dirname);
var required = {};
var fileName;

module.exports = function(app) {
  files.forEach((file) => {
    if (file.indexOf('index') === -1) {
      fileName = file.replace(/\.js/, '');

      required[fileName] = require('./' + fileName)(app);
    }
  });
}