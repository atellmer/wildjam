'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const nib = require('nib');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const config = require('../config');


if (config.development) {
  gulp.task('styles', () => {
    return gulp.src([
      `${config.path.shared}/**/*.styl`,
      `${config.path.components}/**/*.styl`])
      .pipe(concat('bundle.styl'))
      .pipe(stylus({
        use: [nib()],
        compress: false
      }))
      .pipe(gulp.dest(config.path.dist));
  });
}

if (config.production) {
  gulp.task('styles', () => {
    return gulp.src([
      `${config.path.shared}/**/*.styl`,
      `${config.path.components}/**/*.styl`])
      .pipe(stylus({
        use: [nib()],
        compress: false
      }))
      .pipe(gulp.dest(file => file.base));
  });
}

