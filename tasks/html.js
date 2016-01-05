var gulp = require('gulp');

module.exports = function(opts) {
  gulp.task('html', function() {
    gulp.src(opts.html.srcFile)
      .pipe(gulp.dest(opts.html.buildDir));
  });
}