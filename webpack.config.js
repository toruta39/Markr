const path = require('path');

module.exports = {
  entry: './renderer/index.js',
  output: {
    path: __dirname,
    filename: 'renderer.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0,presets[]=stage-1,presets[]=stage-2' },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?' +
          ['', require('bourbon').includePaths, 'node_modules/normalize.css']
          .map(encodeURIComponent).join('&includePaths[]=').slice(1)
      }
    ]
  },
  devtool: 'source-map',
  target: 'atom'
};
