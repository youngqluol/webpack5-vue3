const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config');
const { proxySettings, DEFAULT_PORT } = require('./config');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: '../dist',
    compress: true,
    port: DEFAULT_PORT,
    open: true,
    client: {
      overlay: false,
      // progress: true
    },
    proxy: {
      ...proxySettings,
    },
  },
});
