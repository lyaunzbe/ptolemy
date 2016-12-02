'use strict';

const Gulp = require('gulp');
const Rename = require('gulp-rename');
const Source = require('vinyl-source-stream');
const Browserify = require('browserify');
const Derequire = require('gulp-derequire');
const Watchify = require('watchify');
const Babelify = require('babelify');
const Notify = require('gulp-notify');


function compile (watch) {
  let bundler = Browserify({
    // Required watchify args
    cache: {}, packageCache: {},
    // Specify the entry point of your app
    entries: ['./lib/ptolemy.js'],
    // Enable source maps!
    debug: true,
    // Allows this to be included from as bundled library
    standalone: 'window'
  });

  bundler
  .transform(Babelify.configure({
    presets: ['latest']
  }))
  .transform('debowerify');

  let bundle = function () {
    console.log('Bundling ->');
    return bundler.bundle()
      .on('error', function() {
        let args = Array.prototype.slice.call(arguments);
        // Send error to notification center with gulp-notify
        Notify.onError({
          title: 'Compile Error',
          message: '<%= error.message %>'
        }).apply(this, args);

        // Keep gulp from hanging on this task
        this.emit('end');
      })
      .pipe(Source('./index.js'))
      .pipe(Derequire())
      .pipe(Rename('ptolemy.js'))
      .pipe(Gulp.dest('dist/'))
  };

  if (watch) {
    bundler = Watchify(bundler)
      .on('update', bundle);

    return bundle();
  }

  return bundle();
}

function watch() {
  return compile(true);
};

Gulp.task('build', function () { return compile(); });
Gulp.task('watch', function() { return watch(); });


