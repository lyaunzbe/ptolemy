var gulp = require('gulp');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var derequire = require('gulp-derequire');
var watchify = require('watchify');
var babelify = require('babelify');
var notify = require('gulp-notify');


function compile (watch) {
  var bundler = browserify({
    // Required watchify args
    cache: {}, packageCache: {},
    // Specify the entry point of your app
    entries: ['./lib/ptolemy.js'],
    // Add file extentions to make optional in your requires
    extensions: ['.js'],
    // Enable source maps!
    debug: true,
    // Allows this to be included from as bundled library
    standalone: 'window'
  });

  bundler
  .transform(babelify.configure({
    presets: ['latest'],
    extensions: ['.js']
  }))
  .transform('debowerify');

  var bundle = function () {
    console.log('Bundling ->');
    return bundler.bundle()
      .on('error', function() {
        var args = Array.prototype.slice.call(arguments);
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


