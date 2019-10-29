const { src, dest, watch } = require("gulp");
const cache = require("gulp-cached");
const csscomb = require('gulp-csscomb');
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require('gulp-group-css-media-queries');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const changed = require('gulp-changed');

const compileSass = () => {
  return src("css/style.scss")
    .pipe(cache('sass'))
    .pipe(csscomb())
    .pipe(
      sass({
        outputStyle: "expanded"
      })
    )
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(dest("css"))
    .pipe(notify({
      title: 'Sassをコンパイルしました。',
      message: new Date()
    }));
};

const watchSassFiles = () => watch("css/style.scss", compileSass);

const pathsIMG = {
srcDir : 'img_sources/',
dstDir : 'img'
}
const srcGlob = pathsIMG.srcDir + '*.+(jpg|jpeg|png|gif|svg)';
const dstGlob = pathsIMG.dstDir;

const images = () => {
  return src(srcGlob)
    .pipe(changed(dstGlob))
    .pipe(imagemin(
      [
        pngquant({ quality:  [.85, .95], speed: 1 }),
        mozjpeg({ quality: 80 }),
        imagemin.svgo(),
        imagemin.gifsicle()
      ]
    ))
    .pipe(dest( dstGlob ));
};

const build = () => {
  return src([
    "index.html",
    "**/img/*.png",
    "**/css/*.css"])
    .pipe(dest('dist'));
};

const build_source = () => {
  return src([
    "index.html",
    "**/img_source/*.png",
    "**/css/*.css"
  ]).pipe(dest("dist_source"));
}

exports.default = watchSassFiles;
exports.images = images;
exports.build = build;
exports.build_source = build_source;
