const { mergeWithRules } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.common.js");

module.exports = mergeWithRules({
  module: {
    rules: {
      test: "match",
      use: "prepend",
    },
  },
})(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
});
