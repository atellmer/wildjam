const gulp = require('gulp');
const inject = require('gulp-inject');
const bowerFiles = require('main-bower-files');
const config = require('../config');


gulp.task('inject-bower', () => {

	gulp.src(`${config.path.root}/**/*.html`)
		.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
		.pipe(gulp.dest(file => file.base));
});
