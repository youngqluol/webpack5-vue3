const { merge } = require('webpack-merge');
// const path = require('path');
const commonConfig = require('./webpack.config');
// const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
// const resolve = (p) => path.resolve(__dirname, p);

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: '../dist',
    compress: true,
    port: 9000,
    open: true,
    client: {
      overlay: false,
      // progress: true
    }
  },
  plugins: [
    // 从 webpack v4 开始, 指定 mode 会自动地配置 process.env.NODE_ENV
    // new DefinePlugin({
    // }),
    // 在 webpack 5 中 HMR 已自动支持。无需配置
    // new HotModuleReplacementPlugin()
  ]
});
