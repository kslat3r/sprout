var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

module.exports = function(opts) {
  gulp.task('styles', function() {
    var sassOpts = {
      includePaths: [
        opts.vendorDir + '/bootstrap-sass/assets/stylesheets',
        opts.vendorDir + '/jasny-bootstrap/scss',
        opts.vendorDir + '/font-awesome/scss'
      ]
    };

    gulp.src(opts.styles.srcFile)
      .pipe(plumber())
      .pipe(sass(sassOpts))
      .pipe(gulp.dest(opts.styles.buildDir))
      .pipe(opts.browserSync.reload({
        stream: true
      }));
  });
}
