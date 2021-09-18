const path = require('path');

const resolve = p => path.resolve(__dirname, p);
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    })
  ],
  optimization: {
    emitOnErrors: true, // 在编译时每当有错误时，就会 emit asset
    // 分离chunks
    splitChunks: {
      chunks: 'all', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        }
      }
    },
    minimizer: [
      // webpack@5的terser配置，可以使用`...`方式使用webpack默认，也可以引入terser插件后自定义。
      // 这里选择自定义配置
      // `...`,
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            passes: 2, // webpack的默认值
            drop_debugger: true,
            drop_console: process.env.NODE_ENV === 'production' // 生产环境下关闭
          }
        }
      }),
      // css压缩
      new CssMinimizerPlugin()
    ],
    minimize: true // 是否启用minimizer选项
  }
});
