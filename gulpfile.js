var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var path = require('path');
var webpack = require('webpack');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var config = require('./webpack.config.prod.js');
var open = require('gulp-open');

var port = 3002;

function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...'); //eslint-disable-line
}

gulp.task('build-sass', function () {
  return gulp.src('src/client/client.scss')
    .pipe(sass({ errLogToConsole: true, sourceComments : 'normal' }))
    .pipe(autoprefixer({ browsers: ['ie > 8', 'last 3 versions'], cascade: false }))
    .pipe(rename('client.css'))
    .pipe(gulp.dest('public/'));
});

gulp.task('webpack', function(callback) {
	// run webpack
	webpack(config, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('run', ['browser-sync', 'nodemon', 'webpack', 'build-sass'], function() {
   gulp.watch(['src/client/**/*.js', 'src/client/**/*.jsx'], ['webpack']).on('change', reportChange);
   gulp.watch('src/client/**/*.scss', ['build-sass']).on('change', reportChange);
});

gulp.task('watch', function (done) {
   var called = false;
   return nodemon({
      // nodemon our expressjs server
      script: 'src/server/index.js',
      // watch core server file(s) that require server restart on change
      watch: 'src/server/**/*',
      env: {
         NODE_ENV: 'development',
         PORT: 3000
      }
   })
   .on('start', function onStart() {
      // ensure start only got called once
      if (!called) {
         console.log('listening on port: 3000, opening browsers'); //eslint-disable-line
         setTimeout(function() {
            gulp.src(__filename)
              .pipe(open({uri: 'http://localhost:3000'}));
            done();
         }, 5000);
      }
      called = true;
   });
});

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 2000;

gulp.task('nodemon', ['webpack'], function (done) {
   var called = false;
   return nodemon({
      // nodemon our expressjs server
      script: 'src/server/index.js',
      // watch core server file(s) that require server restart on change
      watch: 'src/server/**/*',
      env: {
         NODE_ENV: 'production',
         PORT: port
      }
   })
   .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { done(); }
      called = true;
   })
   .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
      }, BROWSER_SYNC_RELOAD_DELAY);
   });
});

gulp.task('browser-sync', ['nodemon'], function () {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({
    // watch the following files; changes will be injected (css & images) or cause browser to refresh
    files: ['public/**/*.*'],
    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:' + port,
    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 3000,
    // open the proxied app in chrome
    browser: ['google chrome']
  });
});
