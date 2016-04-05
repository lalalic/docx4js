var gulp=require('gulp'),
    shell=require('gulp-shell');

gulp.task('test', shell.task('jasmine'))
    .task('test.debug',shell.task('node --debug-brk .jasmine.js'))
    .task('karma', shell.task('karma start'))
