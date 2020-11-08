const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const image = require('gulp-image');
const path = require('path');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
 
gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./less'));
});

gulp.task('minify-css', () => {
    return gulp.src('less/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist/css'));
  });

  gulp.task('image', function (done) {
    gulp.src('./preimg/*')
      .pipe(image())
      .pipe(gulp.dest('./dist/img'));
      done();
  });

  
  gulp.task('default', gulp.series('less', 'minify-css', 'image', function() {
    browserSync({
      server: {
        baseDir: 'dist'
      }
      
    });
  
    gulp.watch('less/*.less', gulp.series('less'));
    gulp.watch('less/*.css', gulp.series('minify-css'));
    gulp.watch('dist/img/*.{png,jpg,jpeg,gif,svg}', {cwd: './'} ['image']);
    gulp.watch('dist/css/*.css').on('change', browserSync.reload);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
  }));