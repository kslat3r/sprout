var gulp = require('gulp');

module.exports = function(opts) {
  gulp.task('images', function() {
    gulp.src(opts.images.srcDir)
      .pipe(gulp.dest(opts.images.buildDir));
  });
}