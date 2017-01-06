var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'web', 'app.js'),
  output: {
    path: path.join(__dirname, 'views', 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'web'),
      loader: ['babel-loader'],
      query: {
        cacheDirectory: 'babel_cache',
        presets: ['react', 'es2015']
      }
    }]
  }
};
