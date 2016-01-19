var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

module.exports = function(opts) {
  gulp.task('scripts', function() {
    var browserifyOpts = {
      entries: opts.scripts.srcFile,
      debug: true
    };

    return browserify(browserifyOpts)
      .transform(babelify)
      .bundle()
      .on('error', function(err) {
        console.log(err.message);
        this.emit('end');
      })
      .pipe(source(opts.scripts.buildFile))
      .pipe(gulp.dest(opts.scripts.buildDir))
      .pipe(opts.browserSync.reload({
        stream: true
      }));;
  });

  gulp.task('scripts:vendor', function() {
    return gulp.src(opts.vendor.srcFile)
      .pipe(concat(opts.vendor.buildFile))
      .pipe(gulp.dest(opts.vendor.buildDir));
  });
}