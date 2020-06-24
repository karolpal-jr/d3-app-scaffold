const path = require("path");
const webpack = require("webpack");
const { resolve } = require("path");

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: './main.js',
  output: {
    filename: 'app.js',
    path: '/',
    publicPath: '/',
  },
  plugins : [ new webpack.HotModuleReplacementPlugin()],
  mode: 'development',
}