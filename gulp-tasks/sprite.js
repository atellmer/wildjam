'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const spritesmith = require('gulp.spritesmith');
const config = require('../config');


gulp.task('sprite', () => {
	return gulp.src([`${config.path.images}/icons/source/**/*.*`])
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.css'
		}))
		.pipe(gulp.dest(`${config.path.images}/icons/sprite/`));
});
