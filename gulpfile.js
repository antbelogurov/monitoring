const gulp = require('gulp')// Подключаем Gulp
const browserSync = require('browser-sync').create()
const watch = require('gulp-watch')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourceMap = require('gulp-sourcemaps')
const fileInclude = require('gulp-file-include')



// сборка HTML
gulp.task('html', function (callback) {
	return gulp.src('./app/html/*.html')
		.pipe(fileInclude({
			prefix: '@@'
		}))
		.pipe(gulp.dest('./app/'))
	callback()
})

gulp.task('css', function(done) {
	gulp.src('./src/fullpage.css')
		.pipe(sourceMap.init())
		.pipe(gulp.dest('./dist'))
	done();
});

gulp.task('scss', function (callback) {
	{
		return gulp.src('./app/scss/main.scss')
			.pipe(sourceMap.init())
			.pipe(sass())
			.pipe(autoprefixer({
				overrideBrowserslist: ['last 4 versions']
			}))
			.pipe(sourceMap.write())
			.pipe(gulp.dest('./app/css/'))
		callback()
	}
})

gulp.task('watch', () => {
	watch(['./app/*.html', './app/css/**/*.css',], gulp.parallel(browserSync.reload))

	watch('./app/scss/**/*.scss', function () {
		setTimeout(gulp.parallel('scss'), 1000)
	})

	watch('./app/html/**/*.html', gulp.parallel('html'))
})


//подключили browserSync (читать документацию)
gulp.task('server', () => {
	browserSync.init({
		server: {
			baseDir: "./app/"
		}
	});
});

gulp.task('default', gulp.parallel('server', 'watch', 'scss'))
