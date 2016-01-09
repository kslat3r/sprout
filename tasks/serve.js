var gulp = require('gulp');
var historyApiFallback = require('connect-history-api-fallback')
var nodemon = require('gulp-nodemon');

module.exports = function(opts) {
  gulp.task('serve:server', function() {
    nodemon({
      script: opts.server.script,
      watch: opts.server.watch
    });
  });

  gulp.task('serve:client', function() {
    opts.browserSync.init({
      server: {
        baseDir: opts.server.buildDir,
        middleware: [historyApiFallback()]
      }
    });
  });
};