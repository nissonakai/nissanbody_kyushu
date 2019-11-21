const { src, dest, watch } = require("gulp");
const cache = require("gulp-cached");
const csscomb = require('gulp-csscomb');
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require('gulp-group-css-media-queries');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');
const webpackStream = require('webpack-stream');
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

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

const compileJs = () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(dest("./js"))
    .pipe(notify({
      title: 'ES6をコンパイルしました。',
      message: new Date()
    }));
};

const watchJsFiles = () => watch("js_sources/main.js", compileJs);

const watchAssets = () => {
  watchSassFiles()
  watchJsFiles()
};

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
      ]
    ))
    .pipe(dest( dstGlob ));
};


const outputPath = "dist";

const build = () => {
  return src([
    "index.html",
    "**/img/*",
    "**/css/style.css",
    "**/js/*"])
    .pipe(dest(outputPath))
    .pipe(notify({
      title: '画像を圧縮しました。',
      message: new Date()
    }));
};


exports.watch = watchAssets;
exports.images = images;
exports.build = build;
