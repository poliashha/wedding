const gulp = require("gulp");
const concat = require("gulp-concat-css");
const plumber = require("gulp-plumber");
const del = require("del");
const browserSync = require("browser-sync").create();

function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
}

function html() {
  return gulp
    .src("src/**/*.html")
    .pipe(plumber())
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
}

function css() {
  return gulp
    .src("src/style/**/*.css")
    .pipe(gulp.dest("dist/style"))
    .pipe(browserSync.reload({ stream: true }));
}

function js() {
  return gulp
    .src("src/**/*.js")
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return gulp
    .src("src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}", {encoding: false})
    .pipe(gulp.dest("dist/images"))
    .pipe(browserSync.reload({ stream: true }));
}

function fonts() {
  return gulp
    .src("src/fonts/**/*.{woff,woff2,ttf,otf,eot,svg,css}", { encoding: false })
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.reload({ stream: true }));
}

function clean() {
  return del("dist");
}

function watchFiles() {
  gulp.watch(["src/**/*.html"], html);
  gulp.watch(["src/style/**/*.css"], css);
  gulp.watch(["src/**/*.js"], js);

  gulp.watch(["src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}"], images);
  gulp.watch(["src/fonts/**/*.{woff,woff2,ttf,otf,eot,svg}"], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, css, fonts,  js, images));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;

exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;
