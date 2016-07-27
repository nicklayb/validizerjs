var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('scripts', function(){
    return gulp.src('src/*.js')
        .pipe(concat('validizer.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('validizer.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts']);

gulp.task('watch', function(){
    gulp.watch('src/*.js', ['scripts']);
});
