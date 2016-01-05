var gulp = require('gulp');
var historyApiFallback = require('connect-history-api-fallback')
var nodemon = require('gulp-nodemon');

module.exports = function(opts) {
  gulp.task('serve', function() {
    opts.browserSync.init({
      server: {
        baseDir: opts.server.dir,
        middleware: [historyApiFallback()]
      }
    });

    nodemon({
      script: opts.server.script,
      watch: opts.server.watch
    })
  });
};