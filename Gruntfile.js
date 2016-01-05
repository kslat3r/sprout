module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

  var INPUT_PATH = 'app/index.js';
  var OUTPUT_PATH = './dist/javascripts/sprout.js';

  grunt.registerTask('default', 'concurrent:serve');
  grunt.registerTask('release', ['browserify:release', 'exorcise', 'uglify:release']);

  grunt.initConfig({
    nodemon: {
      serve: {
        script: './bin/www'
      }
    },
    concurrent: {
      serve: {
        tasks: ['browserify:watch', 'nodemon:serve'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    browserify: {
      release: browserifyOptions({
        debug: true
      }),
      watch: browserifyOptions({
        watch: true,
        debug: true
      }),
    },
    exorcise: {
      bundle: {
        files: {
          './dist/javascripts/sprout.map': [OUTPUT_PATH]
        }
      }
    },
    uglify: {
      release: {
        options: {
          sourceMap: true,
          sourceMapIncludeSources: true,
          sourceMapIn: 'dist/javascripts/sprout.map'
        },
        files: {
          'dist/javascripts/sprout.min.js': ['dist/javascripts/sprout.js']
        }
      }
    }
  });

  function browserifyOptions(options) {
    options || (options = {});

    return {
      src: [INPUT_PATH],
      dest: OUTPUT_PATH,
      options: {
        watch: !!options.watch,
        keepAlive: !!options.watch,
        transform: ['babelify', 'envify'],
        browserifyOptions: {
          debug: !!options.debug
        }
      }
    };
  }
};