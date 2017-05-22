const gulp = require('gulp');
const inject = require('gulp-inject');
const hash = require('gulp-hash');
const config = require('../config');


gulp.task('inject', () => {
	let sources;

	const opts = {
    algorithm: 'sha1',
    hashLength: 40,
    template: '<%= name %><%= ext %>?hash=<%= hash %>'
  };

	if (config.development) {
		sources = gulp.src([
		`${config.path.root}/fonts/**/*.css`,
		`${config.path.root}/images/**/*.css`,
		`${config.path.dist}/**/*.css`,
		`${config.path.shared}/polyfills/**/*.js`,
		`${config.path.shared}/libs/**/*.js`,
		`${config.path.components}/**/*.js`
		], {read: false}).pipe(hash(opts));
	} else {
		sources = gulp.src([
			`${config.path.root}/fonts/**/*.css`,
			`${config.path.root}/images/**/*.css`,
			`${config.path.shared}/**/*.css`,
			`${config.path.components}/**/*.css`,
			`${config.path.shared}/polyfills/**/*.js`,
			`${config.path.shared}/libs/**/*.js`,
			`${config.path.components}/**/*.js`
		], {read: false}).pipe(hash(opts));
	}

	return gulp.src(`${config.path.root}/**/*.html`)
		.pipe(inject(sources, {relative: true}))
		.pipe(gulp.dest(file => file.base));
});
