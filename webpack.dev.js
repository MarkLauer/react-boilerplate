const { mergeWithRules } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = mergeWithRules({
  module: {
    rules: {
      test: "match",
      use: "prepend",
    },
  },
})(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader"],
      },
    ],
  },
});
