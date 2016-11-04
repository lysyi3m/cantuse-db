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
    .pipe(jsonCombine('data.json', (data) => {
      const keys = Object.keys(data);
      const formattedData = {
        features: keys.map(key => Object.assign({}, data[key], { slug: key })),
      };
      return new Buffer(JSON.stringify(formattedData));
    }))
    .pipe(jsonFormat(jsonFormat.MINI))
    .pipe(gulp.dest('full/'));
});

gulp.task('default', ['compile']);
