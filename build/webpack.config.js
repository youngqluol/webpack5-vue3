const path = require('path');

const resolve = (p) => path.resolve(__dirname, p);
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  target: ['web'],

  entry: resolve('../src/main.js'),

  output: {
    filename: 'js/[name].[contenthash].js',
    path: resolve('../dist'),
    environment: {
      arrowFunction: false,
      destructuring: false,
    },
    clean: true, // 在生成文件之前清空 output 目录
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      // webpack5+ 用4种模块类型，来替换raw-loader/url-loader/file-loader
      // 参考：https://webpack.docschina.org/guides/asset-modules/
      {
        test: /\.(jpe?g|png|svg|gif)/i,
        type: 'asset',
        generator: {
          filename: 'imgs/[name][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(mp4|avi|mp3|wav)$/,
        type: 'asset',
        generator: {
          filename: 'media/[name][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'fonts/[name][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },

  resolve: {
    // 别名及扩展
    alias: {
      '@': path.resolve(__dirname, '../src'),
      vue: 'vue/dist/vue.runtime.esm-bundler.js',
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },

  plugins: [
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      template: resolve('../public/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    // 禁止vue options api，优化打包体积
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
    }),
  ],
};
