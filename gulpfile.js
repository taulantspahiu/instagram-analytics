// TODO: Finish gulp file for ejs
var gulp = require('gulp');
var ejs = require('gulp-ejs');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function(){
    return gulp.src(['config.js', 'app.js', 'authenticate.js', 'public/scripts/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
});

gulp.task('html', function(){
    return gulp.src('views/*.ejs')
        .pipe(ejs())
        .pipe(gulp.dest("dist/html"))
});

gulp.task('css', function(){
    return gulp.src('public/styles/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('default', ['js', 'html', 'css']);
