var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    runSeq = require('run-sequence'),
    jade = require('gulp-jade'),
    sass = require('gulp-ruby-sass'),
    rename =require('gulp-rename'),
    del = require('del');

gulp.task('clean', function(cb) {
  del('./.tmp/', cb)
});


gulp.task('bower', function () {
  gulp.src('./app/styles/main.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('./app/styles'));
  return gulp.src('./app/partials/afterfooter.jade')
    .pipe(wiredep())
    .pipe(gulp.dest('./app/partials'));
});

gulp.task('templates', function() {
  return gulp.src('./app/pages/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./.tmp'))
});

gulp.task('sass', function() {
  return gulp.src('./app/styles/main.scss')
    .pipe(sass())
    .on('error', function(err) { console.log(err.message); })
    .pipe(gulp.dest('./.tmp/styles'));
});
gulp.task('build', function(cb) {
  runSeq('clean','bower', ['templates', 'sass'], cb);
});

gulp.task('default', ['build']);