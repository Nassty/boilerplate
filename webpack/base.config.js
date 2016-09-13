require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(__dirname, '../static/dist');

const config = {
  devtool: '#eval',
  devServer: {hot: true},
  context: projectRootPath,
  entry: {
    main: ['./src/index.js'],
  },
  output: {
    path: assetsPath,
    filename: '[name].js',
    chunkFilename: '[name][chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /(\.scss)$/, 
      loader: ExtractTextPlugin.extract(
        'style', 
        'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'
      )}, 
      { test: /(\.css)$/, loader: '!style!css' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.svg(\?embed)?$/, loader: 'url?limit=10000!svgo'},
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader' }
    ]
  },
  postcss: () => {
    return [precss, autoprefixer];
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin('main.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
    })
  ]

};

module.exports = config;
