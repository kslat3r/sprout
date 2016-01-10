var gulp = require('gulp');

module.exports = function(opts) {
  gulp.task('fonts', function() {
    gulp.src(opts.fonts.srcDir)
      .pipe(gulp.dest(opts.fonts.buildDir));
  });
}