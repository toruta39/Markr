const path = require('path');
const stylus

module.exports = {
  entry: './renderer/index.js',
  output: {
    path: __dirname,
    filename: 'renderer.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?' +
          ['', require('bourbon').includePaths, 'node_modules/normalize.css']
          .map(encodeURIComponent).join('&includePaths[]=').slice(1)
      }
    ]
  },
  devtool: 'source-map'
};
