'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const stylelint = require('gulp-stylelint');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('serve', function(done) {

    browserSync.init({
        watch: true,
        server: "./"
    });

    gulp.watch("./*.scss", gulp.series('sass'))
        .on('change', () => {
            browserSync.reload();
            done();
        });
    gulp.watch("/*.html")
        .on('change', () => {
            browserSync.reload();
            done();
        });


    done();
});

gulp.task('sass', done => {
    gulp.src('./*.scss')
        .pipe(stylelint({
            failAfterError: true,
            reporters: [
                {
                    formatter: 'verbose',
                    console: true
                },
            ]
        }))
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());

    done();
})

gulp.task('default', gulp.series('sass', 'serve'));
