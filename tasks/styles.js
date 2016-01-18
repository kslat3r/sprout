var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

module.exports = function(opts) {
  gulp.task('styles', function() {
    var sassOpts = {
      includePaths: [
        opts.vendorDir + '/bootstrap-sass/assets/stylesheets',
        opts.vendorDir + '/font-awesome/scss',
        './node_modules/gemini-scrollbar/'
      ]
    };

    gulp.src(opts.styles.srcFile)
      .pipe(plumber())
      .pipe(sass(sassOpts))
      .pipe(gulp.dest(opts.styles.buildDir));
  });
}