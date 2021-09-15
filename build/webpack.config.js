const path = require('path');
const resolve = p => path.resolve(__dirname, p);
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: resolve('../src/main.js'),

  output: {
    filename: '[name].[contenthash].js',
    path: resolve('../dist')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                '@babel/env',
                {
                  modules: false,
                  targets: '> 1%, last 2 versions, not ie <= 8'
                }
              ]
            ],
            plugins: ['@babel/plugin-transform-runtime']
          }
        },
        exclude: /node_modules/
      },
      // webpack5+ 用4种模块类型，来替换raw-loader/url-loader/file-loader
      // 参考：https://webpack.docschina.org/guides/asset-modules/
      {
        test: /\.(jpe?g|png|svg|gif)/i,
        type: 'asset',
        generator: {
          filename: 'imgs/[name][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      },
      {
        test: /\.(mp4|avi|mp3|wav)$/,
        type: 'asset',
        generator: {
          filename: 'media/[name][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'fonts/[name][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: resolve('../public/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new AddAssetHtmlPlugin({
      // dll文件位置
      filepath: resolve('../public/vendor/*.js'),
      // dll 引用路径，请使用 绝对路径！！！
      publicPath: '/vendor',
      // dll最终输出的目录
      outputPath: './vendor'
    }),
    // 在dll里已经打包编译了，避免重复编译
    new webpack.DllReferencePlugin({
      context: process.cwd(), // 注意与__dirname区分
      manifest: resolve('../public/vendor/vendor-manifest.json')
    })
  ]
};
