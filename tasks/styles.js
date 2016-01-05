var gulp = require('gulp');
var sass = require('gulp-sass');

module.exports = function(opts) {
  gulp.task('styles', function() {
    var sassOpts = {
      includePaths: [
        opts.vendorDir + '/bootstrap-sass/assets/stylesheets'
      ]
    };

    gulp.src(opts.styles.srcFile)
      .pipe(sass(sassOpts))
      .pipe(gulp.dest(opts.styles.buildDir));
  });
}