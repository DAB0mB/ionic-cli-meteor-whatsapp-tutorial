var path = require('path');

module.exports = {
  entry: [
    './server/common.js',
    './src/app.js'
  ],
  output: {
    path: path.join(__dirname, './www/js'),
    filename: 'bundle.js'
  },
  target: 'web',
  devtool: 'source-map',
  babel: {
    presets: ['es2015'],
    plugins: ['add-module-exports']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      server: path.join(__dirname, 'server')
    }
  }
};