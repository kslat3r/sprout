var gulp = require('gulp');
var wrench = require('wrench');
var browserSync = require('browser-sync');

var opts = {
  browserSync: browserSync.create(),
  vendorDir: __dirname + '/src/client/vendor',

  scripts: {
    srcFile: __dirname + '/src/client/index.js',
    buildDir: __dirname + '/build/js',
    buildFile: 'app.js',
  },

  styles: {
    srcFile: __dirname + '/src/client/assets/scss/screen.scss',
    buildDir: __dirname + '/build/css',
    buildFile: 'screen.css'
  },

  html: {
    srcFile: __dirname + '/src/client/index.html',
    buildDir: __dirname + '/build'
  },

  server: {
    buildDir: __dirname + '/build',
    script: __dirname + '/src/server',
    watch: [
      __dirname + '/src/server'
    ]
  },

  watch: {
    js: [
      __dirname + '/src/common/**/*.js',
      __dirname + '/src/client/**/*.js'
    ],
    scss: [
      __dirname + '/src/client/assets/scss/**/*.scss'
    ]
  }
};

wrench.readdirSyncRecursive('./tasks').filter(function(file) {
  return (/\.(js)$/i).test(file) && file.indexOf('config.js') === -1;
}).map(function(file) {
  require('./tasks/' + file)(opts);
});

gulp.task('default', ['scripts', 'styles', 'html', 'serve'], function() {
  gulp.start('watch');
});