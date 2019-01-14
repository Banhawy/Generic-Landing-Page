var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
// sass.compiler = require('node-sass');

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
    // .pipe(browserSync.reload({ // Reloading with Browser Sync
    //     stream: true
    // }));
})

// Watchers
gulp.task('watch', function () {
    gulp.watch('docs//styles/sass/**/*.scss', ['sass']);
    gulp.watch('docs/**/*.html', browserSync.reload());
    gulp.watch('docs/js/**/*.js', browserSync.reload);
})

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function () {

    return gulp.docs('docs/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

// Build Sequences
// ---------------
gulp.task('default', ['browserSync']);

// gulp.task('default', function(callback) {
//     runSequence(['hello', 'sass', 'browserSync'], 'watch',
//         callback
//     )
// })

gulp.task('build', function (callback) {
    runSequence(
        ['sass', 'useref'],
        callback
    )
})