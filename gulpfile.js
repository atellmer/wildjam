'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
const config = require('./config');


requireDir('./gulp-tasks');
const defaultTasks = [
	'styles',
	'sprite'
];

if (config.development) {
	defaultTasks.push('watch');
}

gulp.task('watch', () => {
	gulp.watch([`${config.path.root}/**/*.html`], ['templates']);
	gulp.watch([
		`${config.path.shared}/**/*.styl`,
		`${config.path.components}/**/*.styl`], ['styles']);
	gulp.watch([`${config.path.components}/**/*.js`], ['scripts']);
	gulp.watch([`${config.path.images}/icons/source/**/*.*`], ['sprite']);
});

gulp.task('default', defaultTasks);
