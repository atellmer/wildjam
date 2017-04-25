'use strict';

const gulp = require('gulp');
const config = require('../config');


gulp.task('templates', () => {
	return gulp.src([`${config.path.root}/**/*.html`]);
});
