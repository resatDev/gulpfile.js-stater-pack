 /* **********************
 GULP // 
 MINIFY CSS JS IMG// 
 CONCAT CSS JS // 
 BROWSER SYNCHRONOUS // 
 CONVERTER SASS TO CSS //
 ********************** */

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const minifyJS = require('gulp-uglify');
const minifyCSS = require('gulp-csso');
const minifyImg = require('gulp-imagemin');
const concat = require('gulp-concat');
const autoPrefixer = require('gulp-autoprefixer');
const del = require('del');
const runSequence = require('run-sequence');


//testing the Gulp task 

gulp.task('test', () =>{
    console.log("It is working. To running the Gulp tasks, you just run the just 'gulp' in Command Line Interface");
});

//convert to .scss to .css

gulp.task('cssConv', function(){
    return gulp.src("./assets/**/*.scss/")
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(autoPrefixer())
    .pipe(gulp.dest("./assets"))
});

//minify the css files
gulp.task('cssMin', function(){
    return gulp.src('./dist/css/**/*.css')
    .pipe(minifyCSS())
    .pipe(autoPrefixer())
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('./dist/css/'))
});
 
//minify the js files
gulp.task('jsMin', function(){
    return gulp.src('./src/js/**/*.js')
    .pipe(minifyJS())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist/js'))
});

//minify the image
gulp.task('imgMin', function(){
    return gulp.src('./src/img/**/*')
    .pipe(minifyImg())
    .pipe(gulp.dest('./dist/img/'))
});

//delete the dist
gulp.task('del', function(){
    del(['dist/css', 'dist/js', 'dist/img', './**/*.html'])
});


//watching the changing
gulp.task('watching', function(){
    gulp.watch('./src/img/**/*', ['imgMin'])
    gulp.watch('./assets/**/*.scss', ['cssConv'])
    gulp.watch('./src/js/**/*.js' ,['jsMin'])
});

//browser synchronization
gulp.task('browSync', function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

/* To run the all the function with 'gulp' command in CLI */
//default function
gulp.task('default', function(){
    runSequence(
        'cssConv',
        'browSync',
        'watching'
    )
});