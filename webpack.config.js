const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: "development",
  context: path.resolve(__dirname, './src'),
  entry: {
      app: [
          './app.js',
      ],
  },
  output: {
      path: path.resolve(__dirname, './build'),
      filename: 'bundle.js',
  },
  module: {
    rules: [
      {
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/],
          use: [
              {
                  loader: 'babel-loader',
                  options: {
                    babelrc: false,
                    plugins: ['react-hot-loader/babel'],
                    presets: ['env', 'react'],
                  }
              }
          ]
      },
      {
          test: /\.css$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }]
      },
    ],
   },
  devtool: "source-map",
  target: "web",
  stats: "errors-only",
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true,
  },
  plugins: [],
}
