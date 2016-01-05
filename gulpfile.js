var gulp = require('gulp');
var wrench = require('wrench');
var browserSync = require('browser-sync');

var opts = {
  browserSync: browserSync.create(),
  scripts: {
    srcFile: __dirname + '/src/client/index.js',
    destDir: __dirname + '/dist/js',
    destFile: 'app.js',
  },
  html: {
    srcFile: __dirname + '/src/client/index.html',
    destDir: __dirname + '/dist'
  },
  server: {
    dir: __dirname + '/dist',
    script: __dirname + '/src/server',
    watch: [
      __dirname + '/src/server'
    ]
  },
  watch: {
    js: [
      __dirname + '/src/common/**/*.js',
      __dirname + '/src/client/**/*.js'
    ]
  },
};

wrench.readdirSyncRecursive('./tasks').filter(function(file) {
  return (/\.(js)$/i).test(file) && file.indexOf('config.js') === -1;
}).map(function(file) {
  require('./tasks/' + file)(opts);
});

gulp.task('default', ['scripts', 'html', 'serve'], function() {
  gulp.start('watch');
});