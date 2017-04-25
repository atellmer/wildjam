'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const tinypng = require('gulp-tinypng');
const config = require('../config');


gulp.task('img-compress', () => {
	return gulp.src([`${config.path.images}/**/*.{jpg,jpeg,png}`])
		.pipe(tinypng(config.tinyPngApiKey))
		.pipe(gulp.dest(file => file.base));
});
