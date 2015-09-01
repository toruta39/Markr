const path = require('path');
const stylus

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?' +
          ['', require('bourbon').includePaths, 'node_modules/normalize.css', 'src/style']
          .map(encodeURIComponent).join('&includePaths[]=').slice(1)
      }
    ]
  },
  devtool: 'source-map'
};
