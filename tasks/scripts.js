var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

module.exports = function(opts) {
  gulp.task('scripts', function() {
    var browserifyOpts = {
      entries: opts.scripts.srcFile,
      debug: true
    };

    return browserify(browserifyOpts)
      .transform(babelify)
      .bundle()
      .pipe(source(opts.scripts.buildFile))
      .pipe(gulp.dest(opts.scripts.buildDir));
  });
}