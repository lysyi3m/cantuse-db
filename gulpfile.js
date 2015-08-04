var gulp        = require('gulp');
var jsoncombine = require("gulp-jsoncombine");
var jsonFmt     = require('gulp-json-fmt');
var jsonlint    = require('gulp-jsonlint');

gulp.task('check', function() {
  gulp.src('features/*.json')
    .pipe(jsonlint())
    .pipe(jsonlint.reporter())
    .pipe(jsonFmt(jsonFmt.PRETTY))
    .pipe(gulp.dest("features/"));
});

gulp.task('compile', function () {
  gulp.src('features/*.json')
    .pipe(jsoncombine('compiled.json', function(data) {
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(jsonFmt(jsonFmt.PRETTY))
    .pipe(gulp.dest('full/'));

  gulp.src('features/*.json')
    .pipe(jsoncombine('compressed.json', function(data) {
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(jsonFmt(jsonFmt.MINI))
    .pipe(gulp.dest('full/'));
});
