var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
    library: 'bundle',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['@babel/preset-env'],
        }
      }
    ]
  }
}
