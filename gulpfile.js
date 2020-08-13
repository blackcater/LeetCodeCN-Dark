const { task, watch, series, src, dest } = require("gulp");
const less = require("gulp-less");
const concat = require("gulp-concat");
const LessPluginInlineSvg = require("less-plugin-inline-svg");
const LessPluginAutoPrefix = require("less-plugin-autoprefix");
const pkg = require("./package.json");

function buildLess() {
  return src("src/*.less")
    .pipe(
      less({
        plugins: [
          new LessPluginAutoPrefix({ browsers: ["last 2 versions", "> 1%"] }),
          new LessPluginInlineSvg({ base64: true }),
        ],
      })
    )
    .pipe(concat("leetcode-cn-dark.user.css"))
    .pipe(dest("./"));
}

task("build", series(buildLess));
