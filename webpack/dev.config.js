require('babel-polyfill');

const config = require('./base.config.js');
config.entry.main.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
config.module.loaders.unshift({
  test: /\.js$/,
  exclude: /node_modules/,
  loaders: ['babel?presets[]=es2015&presets[]=react', 'eslint']}
);
module.exports = config;
