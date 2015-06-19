var gulp        = require('gulp');
var concat_json = require("gulp-concat-json");
var jsonFmt     = require("gulp-json-fmt");
var jsonlint    = require("gulp-jsonlint");

gulp.task('test', function() {
  gulp.src('features-json/*.json')
    .pipe(jsonlint())
    .pipe(jsonlint.reporter())
    .pipe(jsonFmt(jsonFmt.PRETTY))
    .pipe(gulp.dest("features-json/"));
});

gulp.task('compile', function () {
  gulp.src("features-json/*.json")
    .pipe(concat_json("full-compiled.json"))
    .pipe(jsonFmt(jsonFmt.PRETTY))
    .pipe(gulp.dest("full-json/"));
});

gulp.task('compress', function () {
  gulp.src("features-json/*.json")
    .pipe(concat_json("full-compressed.json"))
    .pipe(jsonFmt(jsonFmt.MINI))
    .pipe(gulp.dest("full-json/"));
});
