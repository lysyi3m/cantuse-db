import gulp from 'gulp';
import jsonCombine from 'gulp-jsoncombine';
import jsonFormat from 'gulp-json-fmt';
import jsonLint from 'gulp-jsonlint';

gulp.task('test', () => {
  gulp.src('features/*.json')
    .pipe(jsonLint())
    .pipe(jsonLint.reporter())
    .pipe(jsonFormat(jsonFormat.PRETTY))
    .pipe(gulp.dest('features/'));
});

gulp.task('compile', ['test'], () => {
  gulp.src('features/*.json')
    .pipe(jsonCombine('compiled.json', (data) => {
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(jsonFormat(jsonFormat.PRETTY))
    .pipe(gulp.dest('full/'));

  gulp.src('features/*.json')
    .pipe(jsonCombine('compressed.json', (data) => {
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(jsonFormat(jsonFormat.MINI))
    .pipe(gulp.dest('full/'));
});

gulp.task('default', ['compile']);
