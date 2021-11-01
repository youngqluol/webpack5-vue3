const path = require('path');

const resolve = p => path.resolve(__dirname, p);
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      destructuring: false
    },
    clean: true // 在生成文件之前清空 output 目录
  },

  module: {
    rules: [
      // style-loader: 使用多个style标签将CSS插入到DOM中，反应快
      // MiniCssExtractPlugin: 将css抽离成单独的CSS文件，并行加载
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
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.(vue|js)$/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: false,
            quiet: process.env.NODE_ENV === 'production'
          }
        },
        include: [resolve('../src')]
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

  // 持久化缓存：https://webpack.docschina.org/configuration/cache/
  // cache: {
  //   type: 'filesystem'
  // },

  resolve: {
    // 别名及扩展
    alias: {
      '@': path.resolve(__dirname, '../src'),
      vue: 'vue/dist/vue.runtime.esm-bundler.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    // 禁止vue options api，优化打包体积
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false
    })
  ]
};
