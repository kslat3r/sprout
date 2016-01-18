var gulp = require('gulp');
var watch = require('gulp-watch');

module.exports = function(opts) {
  gulp.task('watch', function() {
    watch(opts.watch.js, function() {
      gulp.start('scripts')
    });

    watch(opts.watch.scss, function() {
      gulp.start('styles')
    });

    /*watch(opts.scripts.buildDir + '/' + opts.scripts.buildFile, function() {
      opts.browserSync.reload();
    });*/

    /*watch(opts.styles.buildDir + '/' + opts.styles.buildFile, function() {
      opts.browserSync.reload();
    });*/
  });
};