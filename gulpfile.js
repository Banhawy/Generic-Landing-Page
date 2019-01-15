var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Basic Gulp task syntax
gulp.task('hello', function () {
    console.log('Eshta Ya Me3allemm!');
})

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './docs'
        }
    })
    gulp.watch('docs/styles/sass/*.scss', ['sass']).on('change', function () {
        browserSync.reload();
    });
    gulp.watch('docs/*.html').on('change', function () {
        browserSync.reload();
    });
})

gulp.task('sass', function () {
    return gulp.docs('docs/styles/sass/**/*.scss') // Gets all files ending with .scss in docs/scss and children dirs
        .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
        .pipe(gulp.dest('docs/styles/css')) // Outputs it in the css folder
})

// Watchers
gulp.task('watch', function () {
    gulp.watch('docs//styles/sass/**/*.scss', ['sass']);
    gulp.watch('docs/**/*.html', browserSync.reload());
    gulp.watch('docs/js/**/*.js', browserSync.reload);
})
// Build Sequences
// ---------------
gulp.task('default', ['browserSync']);