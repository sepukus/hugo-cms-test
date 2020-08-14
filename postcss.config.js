const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    // require("postcss-import")({}),
    // require("postcss-preset-env")({
    //   browsers: "last 2 versions",
    // }),
    // require("autoprefixer")({}),
    // require("cssnano")({
    //   preset: "default",
    // }),
    // purgecss({
    //   content: ["./**/*.html"],
    //   keyframes: true,
    //   whitelist: ["sticky-header"],
    //   defaultExtractor: content => content.match(/[@A-Za-z0-9_-]+/g) || []
    // })
  ],
};
