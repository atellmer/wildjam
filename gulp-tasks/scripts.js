'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const config = require('../config');

gulp.task('scripts', () => {
	return gulp.src([
		`${config.path.shared}/**/*.js`,
		`${config.path.components}/**/*.js`
	]);
});
