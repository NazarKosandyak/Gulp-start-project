const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require("gulp-rename");
const del = require('del');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

const cache = require('gulp-cache');



const styles = ()=>{
    return gulp.src('src/styles/*.css')
    .pipe(cssnano())
    .pipe(rename({suffix:'.min'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('prodaction/css'))
}

const pugFile = ()=>{
    return gulp.src('src/pug/*.pug')
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest('prodaction'))
}

const minImages =()=>{
    return gulp.src('src/image/*.*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('prodaction/image'))
}

const watch =()=>{
    gulp.watch('src/image/*.*',minImages)
    gulp.watch('src/pug/**/*.pug',pugFile)
    gulp.watch('src/styles/**/*.css',styles)
}

// const server = ()=>{
//     browserSync.init({
//         server:{
//             baseDir:'./prodaction'
//         },
//         notify:false
//     });
//     browserSync.watch('prodaction',browserSync.reload)
// }

exports.default = gulp.series(
    
    gulp.parallel(styles,pugFile,minImages),
    gulp.parallel(watch)
    )
