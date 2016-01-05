var gulp = require('gulp');
var watch = require('gulp-watch');

module.exports = function(opts) {
  gulp.task('watch', function() {
    watch(opts.watch.js, function() {
      gulp.start('scripts')
    });

    watch(opts.scripts.destDir + '/' + opts.scripts.destFile, function() {
      opts.browserSync.reload();
    });
  });
};