const path = require('path');
const resolve = p => path.resolve(__dirname, p);
const commonConfig = require('./webpack.config');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map'
})