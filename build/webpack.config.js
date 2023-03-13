const path = require('path');

const resolve = p => path.resolve(__dirname, p);
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const { isDevEnv, isProdEnv } = require('./config');

module.exports = {
  target: ['web'],

  entry: resolve('../src/main.ts'),

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
          isDevEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          isDevEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              // transpileOnly: true,
            }
          }
        ],
        include: resolve('../src')
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
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
      '@src': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../components')
    },
    extensions: ['*', '.js', '.vue', '.json', '.ts']
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
      )
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
              compiler: require.resolve('@vue/compiler-sfc')
            }
          }
        },
      }
    )
  ]
};
