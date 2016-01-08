var gulp = require('gulp');
var replace = require('gulp-replace');

module.exports = function(opts) {
  gulp.task('html', function() {
    gulp.src(opts.html.srcFile)
      .pipe(replace('{{initialDataUrl}}', opts.nconf.get('initialDataUrl')))
      .pipe(gulp.dest(opts.html.buildDir));
  });
}