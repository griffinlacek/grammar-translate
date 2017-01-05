// webpack.config.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'web', 'app.js'),
  output: {
    path: path.join(__dirname, 'views', js),
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
  },
  plugins: [
     new Webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
     }),
     new.Webpack.optimize.DedupePlugin(),
     new.Webpack.optimize.OccurenceOrderPlugin(),
     new.Webpack.optimize.UglifyJsPlugin({
       compress: {warnings: false},
       mangle: true,
       sourcemap: false,
       beautify: false,
       dead_code: true
     })
  ]
};
