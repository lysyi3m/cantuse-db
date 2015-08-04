var gulp        = require('gulp');
var jsoncombine = require("gulp-jsoncombine");
var jsonFmt     = require('gulp-json-fmt');
var jsonlint    = require('gulp-jsonlint');

gulp.task('check', function() {
  gulp.src('features-json/*.json')
    .pipe(jsonlint())
    .pipe(jsonlint.reporter())
    .pipe(jsonFmt(jsonFmt.PRETTY))
    .pipe(gulp.dest("features-json/"));
});

gulp.task('compile', function () {
  gulp.src('features-json/*.json')
    .pipe(jsoncombine('full-compiled.json', function(data) {
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(jsonFmt(jsonFmt.PRETTY))
    .pipe(gulp.dest('full-json/'));

  gulp.src('features-json/*.json')
    .pipe(jsoncombine('full-compressed.json', function(data) {
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(jsonFmt(jsonFmt.MINI))
    .pipe(gulp.dest('full-json/'));
});
