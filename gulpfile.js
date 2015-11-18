var gulp=require('gulp'),
    shell=require('gulp-shell');

gulp.task('watch',shell.task('"node_modules/.bin/watchify" -d -r ./browser.js:docx4js -o dist/docx4js.js'))
    .task('build', shell.task('"node_modules/.bin/babel" src --watch --source-maps --out-dir parser'))
    .task('test', shell.task('"node_modules/.bin/jasmine"'))
