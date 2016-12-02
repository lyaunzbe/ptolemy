'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const derequire = require('gulp-derequire');
const watchify = require('watchify');
const babelify = require('babelify');
const notify = require('gulp-notify');


function compile (watch) {
  let bundler = browserify({
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
  .transform(babelify.configure({
    presets: ['latest']
  }))
  .transform('debowerify');

  let bundle = function () {
    console.log('Bundling ->');
    return bundler.bundle()
      .on('error', function() {
        let args = Array.prototype.slice.call(arguments);
        // Send error to notification center with gulp-notify
        notify.onError({
          title: 'Compile Error',
          message: '<%= error.message %>'
        }).apply(this, args);

        // Keep gulp from hanging on this task
        this.emit('end');
      })
      .pipe(source('./index.js'))
      .pipe(derequire())
      .pipe(rename('ptolemy.js'))
      .pipe(gulp.dest('dist/'))
  };

  if (watch) {
    bundler = watchify(bundler)
      .on('update', bundle);

    return bundle();
  }

  return bundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function () { return compile(); });
gulp.task('watch', function() { return watch(); });


