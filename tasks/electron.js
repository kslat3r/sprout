var gulp = require('gulp');

module.exports = function(opts) {
  gulp.task('electron', function() {
    gulp.src(opts.electron.srcFile)
      .pipe(gulp.dest(opts.electron.buildDir));
  });
}
