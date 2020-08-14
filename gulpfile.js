// Copyright (c) 2020 blackcater
// [Software Name] is licensed under Mulan PSL v2.
// You can use this software according to the terms and conditions of the Mulan PSL v2.
// You may obtain a copy of Mulan PSL v2 at:
//             http://license.coscl.org.cn/MulanPSL2
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PSL v2 for more details.

const { task, watch, series, src, dest } = require("gulp");
const less = require("gulp-less");
const concat = require("gulp-concat");
const header = require("gulp-header");
const LessPluginInlineSvg = require("less-plugin-inline-svg");
const LessPluginAutoPrefix = require("less-plugin-autoprefix");
const pkg = require("./package.json");

const headerTpl = `/* ==UserStyle==
@name         LeetcodeCN Dark
@namespace    github.com/blackcater/LeetCodeCN-Dark
@version      <%= pkg.version %>
@license      <%= pkg.license %>
@updateURL    https://raw.githubusercontent.com/blackcater/LeetCodeCN-Dark/master/leetcode-cn-dark.user.css
@author       <%= pkg.author %>
==/UserStyle== */
`;

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
    .pipe(header(headerTpl, { pkg }))
    .pipe(dest("./"));
}

task("build", series(buildLess));

task("watch", function () {
  watch("src/**/*.less", series(buildLess));
});
