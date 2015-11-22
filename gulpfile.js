var gulp=require('gulp'),
    shell=require('gulp-shell');

gulp.task('watch',shell.task('watchify -d -r ./browser.js:docx4js -o dist/docx4js.js'))
    .task('build', shell.task('babel src --watch --source-maps --out-dir parser'))
    .task('test', shell.task('jasmine'))
    .task('default', function(){
        gulp.watch(['parser/*.js'],['test'])
    })
