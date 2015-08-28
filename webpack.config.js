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
      { test: /\.styl$/, loader: 'style!css!stylus?paths=node_modules/' }
    ]
  }
};
