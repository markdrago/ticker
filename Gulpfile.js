var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  return gulp.src('**/main.scss')
  .pipe(sass())
  .pipe(gulp.dest(__dirname));
});

gulp.task('watch-sass', function() {
  gulp.watch('public/**/*.scss', ['sass']);
});
