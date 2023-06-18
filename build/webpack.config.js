const path = require('node:path');

const resolve = p => path.resolve(__dirname, p);
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const { isDevEnv, isProdEnv } = require('./config');
const { resolveApp } = require('./utils');

module.exports = {
  entry: resolveApp('src/main.ts'),

  output: {
    filename: 'js/[name].[contenthash].js',
    path: resolveApp('dist'),
    environment: {
      arrowFunction: false,
      const: false,
    },
    clean: true, // 在生成文件之前清空 output 目录
  },

  // 持久化缓存：https://webpack.docschina.org/configuration/cache/
  cache: {
    type: 'filesystem',
    cacheDirectory: resolveApp('node_modules/.cache'),
    store: 'pack',
    buildDependencies: {
      defaultWebpack: ['webpack/lib/'],
      config: [__filename],
      tsconfig: [resolveApp('tsconfig.json')],
    },
  },

  module: {
    rules: [
      // 【style-loader】: 使用多个style标签将CSS插入到DOM中，反应快
      // 【MiniCssExtractPlugin】: 将css抽离成单独的CSS文件，并行加载
      {
        test: /\.css$/,
        use: [
          isDevEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          isDevEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        include: resolve('../src'),
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      // TODO 构建时显示eslint错误信息
      // {
      //   test: /\.(vue|js)$/,
      //   enforce: 'pre',
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       formatter: require('eslint-friendly-formatter'),
      //       emitWarning: false,
      //       quiet: process.env.NODE_ENV === 'production'
      //     }
      //   },
      //   include: [resolve('../src')]
      // },
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
      '@src': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../components'),
    },
    extensions: ['*', '.ts', '.js', '.vue', '.json'],
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      filename: 'index.html',
      inject: 'body',
      ...(isProdEnv
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : undefined
      ),
    }),
    new ForkTsCheckerPlugin(
      {
        async: isDevEnv,
        typescript: {
          context: resolve('../'),
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: 'write-references',
          extensions: {
            vue: {
              enabled: true,
              compiler: require.resolve('@vue/compiler-sfc'),
            },
          },
        },
      },
    ),
  ],
};
