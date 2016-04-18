var camelCase = require('lodash.camelcase');
var upperFirst = require('lodash.upperfirst');
var path = require('path');

var patterns = {
  meteorPack: /^meteor\/(.+)$/,
  cordovaPack: /^cordova\/(.+)$/
};

module.exports = {
  entry: [
    './server/common.js',
    './src/app.js'
  ],
  output: {
    path: path.join(__dirname, './www/js'),
    filename: 'app.bundle.js'
  },
  externals: [
    {
      angular: true,
      cordova: true,
      ionic: true,
      moment: true
    },
    customExternals
  ],
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

function customExternals(context, request, callback) {
  var meteorPackMatch = request.match(patterns.meteorPack);

  if (meteorPackMatch) {
    var packName = meteorPackMatch[1];
    return callback(null, 'Package["' + packName + '"]');
  }

  var cordovaPackMatch = request.match(patterns.cordovaPack);

  if (cordovaPackMatch) {
    var packName = upperFirst(camelCase(cordovaPackMatch[1]));
    return callback(null, 'this.cordova && cordova.plugins && cordova.plugins.' + packName);
  }

  callback();
}