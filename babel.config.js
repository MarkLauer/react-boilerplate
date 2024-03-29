module.exports = function (api) {
  const presets = [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ];

  const plugins = [];

  if (api.env("development")) {
    plugins.push("react-refresh/babel");
  }

  return {
    presets,
    plugins,
  };
};
