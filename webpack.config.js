const path = require("path");

module.exports = {
  entry: "./src/memory_game.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [],
  },
  mode: "development",
};