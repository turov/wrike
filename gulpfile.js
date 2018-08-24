"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var imagemin = require('gulp-imagemin');              /* Минификация картинок jpg, png, gif */
var spritesmith = require('gulp.spritesmith');        /* Объединение картинок png в спрайты */
var svgmin = require('gulp-svgmin');                  /* Минификация SVG */
var uglify = require('gulp-uglify');                  /* Минификация JS */
var svgSprite = require('gulp-svg-sprite');
var minify = require('gulp-csso');
var rename = require('gulp-rename');

var config = {
  shape: {
    dimension: {         // Set maximum dimensions
      maxWidth: 500,
      maxHeight: 500
    },
    spacing: {         // Add padding
      padding: 0
    }
  },
  mode: {
    symbol: {
      dest : '.'
    }
  }
};

var server = require('browser-sync').create();

gulp.task('style', function() {
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('css'))
    .pipe(server.stream());
});

gulp.task('stylesass', function() {
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 2 versions'
      ]})
    ]))
    .pipe(gulp.dest('css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('svg-sprite', function (cb) {
  return gulp.src('img/icons/*.svg')
    .pipe(svgmin())
    .pipe(svgSprite(config))
    .pipe(gulp.dest('img'));
});

gulp.task('serve', ['style'], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  gulp.watch("*.html").on("change", server.reload);
});

gulp.task('images', function() {
  return gulp.src(['img/**/*.{png,jpg,gif}', '!img/icons/**/*'])
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('pngsprite', function() {
  var spriteData =
    gulp.src('img/icons/*.png')
      .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
      }));

  spriteData.img.pipe(gulp.dest('img'));
  spriteData.css.pipe(gulp.dest('css'));
});

gulp.task("compress", function() {
  gulp.src("js/**/*.js")
    .pipe(uglify({
      ext:{
        src:".js",
        min:".min.js"
      }
    }))
    .pipe(gulp.dest("js"))
});


gulp.task('compress_src', function (cb) {
  pump([
      gulp.src('js/*.js'),
      uglify(),
      gulp.dest('js')
    ],
    cb
  );
});


