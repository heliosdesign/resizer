/*

    wtf is this?

        edit source/helios-resizer.js, using gulp watch.
        It'll auto-compile into different versions.

*/

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    fs = require('fs'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr');

var server = lr();

var content = function(){
    return fs.readFileSync('source/helios-resizer.js', 'utf8');
}

gulp.task('build', function(){
    return gulp.src(['source/wrapper.standalone.js'])
        .pipe(replace('%%% REPLACE %%%', content() ))
        .pipe(rename({ basename: 'helios-resizer' }))
        .pipe(gulp.dest('.'))
        .pipe(uglify({ mangle: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('.'))
        .pipe(livereload(server))
})

gulp.task('build-ng', function(){
    return gulp.src(['source/wrapper.angular.js'])
        .pipe(replace('%%% REPLACE %%%', content() ))
        .pipe(rename({
            basename: 'helios-resizer.angular'
        }))
        .pipe(gulp.dest('.'))
        .pipe(uglify({ mangle: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('.'))
})

gulp.task('default', ['build', 'build-ng']);

gulp.task('watch',function(){

    server.listen(35729, function(err){
        if(err) return console.log(err);
    });

    gulp.watch('source/helios-resizer.js', ['build', 'build-ng']);

})