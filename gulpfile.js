var nconf = require('nconf');
var gulp = require('gulp');
var wrench = require('wrench');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

//config

var setupConfig = function(env) {
  nconf.argv()
    .env()
    .file({
      file: __dirname + '/tasks/config/' + env + '.json'
    });
}

//options

var opts = {
  nconf: nconf,

  browserSync: browserSync.create(),
  vendorDir: __dirname + '/src/client/vendor',
  nodeModulesDir: __dirname + '/node_modules',

  scripts: {
    srcFile: __dirname + '/src/client/app/index.js',
    buildDir: __dirname + '/build/js',
    buildFile: 'app.js',
  },

  vendor: {
    srcFile: [
      __dirname + '/src/client/vendor/jquery/dist/jquery.min.js',
      __dirname + '/src/client/vendor/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      __dirname + '/src/client/vendor/wavesurfer.js/dist/wavesurfer.min.js',
      __dirname + '/src/client/vendor/wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'
    ],
    buildDir: __dirname + '/build/js',
    buildFile: 'vendor.js'
  },

  styles: {
    srcFile: __dirname + '/src/client/assets/scss/screen.scss',
    buildDir: __dirname + '/build/css',
    buildFile: 'screen.css'
  },

  fonts: {
    srcDir: __dirname + '/src/client/vendor/font-awesome/fonts/**/*',
    buildDir: __dirname + '/build/fonts'
  },

  images: {
    srcDir: __dirname + '/src/client/assets/images/**/*',
    buildDir: __dirname + '/build/images'
  },

  impulses: {
    srcDir: __dirname + '/src/client/assets/impulses/**/*',
    buildDir: __dirname + '/build/impulses'
  },

  html: {
    srcFile: __dirname + '/src/client/index.html',
    buildDir: __dirname + '/build'
  },

  server: {
    buildDir: __dirname + '/build',
    script: __dirname + '/src/server',
    watch: [
      __dirname + '/src/server',
      __dirname + '/src/common'
    ]
  },

  watch: {
    js: [
      __dirname + '/src/client/**/*.js'
    ],
    scss: [
      __dirname + '/src/client/assets/scss/**/*.scss'
    ]
  }
};

wrench.readdirSyncRecursive('./tasks').filter(function(file) {
  return (/\.(js)$/i).test(file) && file.indexOf('config.js') === -1;
}).map(function(file) {
  require('./tasks/' + file)(opts);
});

//tasks

gulp.task('default', function(callback) {
  setupConfig('development');
  runSequence('serve:server', 'watch', ['scripts', 'scripts:vendor', 'styles', 'fonts', 'images', 'html'], 'serve:client');
});

gulp.on('err', function(err) {
  console.log(err);
});
