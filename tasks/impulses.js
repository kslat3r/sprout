var gulp = require('gulp');

module.exports = function(opts) {
  gulp.task('impulses', function() {
    gulp.src(opts.impulses.srcDir)
      .pipe(gulp.dest(opts.impulses.buildDir));
  });
}
