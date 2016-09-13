const webpack = require('webpack');
const config = require('./dev.config.js');

const express = require('express');
const path = require('path');

const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const app = express();

const ENTRY_POINT = path.resolve(__dirname, '..', 'static', 'index.html');


const compiler = webpack(config);

const DEV_HOST = 'localhost'
const DEV_PORT = 3000;

var lastLength = 0; // eslint-disable-line
compiler.apply(new ProgressPlugin((completed, msg) => {
  process.stdout.write(' '.repeat(lastLength));
  process.stdout.write('\r'.repeat(lastLength));
  const toPrint = ` Webpack: ${Math.trunc(completed * 100).toString()}% ${msg}`;
  lastLength = toPrint.length;
  const clear = '\r'.repeat(toPrint.length);
  process.stdout.write(`${toPrint}${clear}`);
}));

const serverOptions = {
  contentBase: `http://${DEV_HOST}:${DEV_PORT}`,
  hot: true,
  inline: false,
  lazy: false,
  publicPath: '/dist/',
  headers: {'Access-Control-Allow-Origin': '*'},
  noInfo: true,
  quiet: true
};

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler, {
  contentBase: config.output.contentBase,
  noInfo: true,
  quiet: true
}));

app.get('*', (req, res) => {
  res.sendFile(ENTRY_POINT);
});

compiler.run((err, stats) => {
  console.log(stats.toString({
    colors: true,
    context: 'minimal',
    chunks: false
  }));
});

app.listen(DEV_PORT, DEV_HOST, (err) => {
  if (err) {
    console.error(err);
  }
});
