// 暂时废弃
const path = require('path');

const resolve = p => path.resolve(__dirname, p);
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');

const dllConfig = {
  mode: 'production',

  // target: ['web'], // webpack5+下不加这个，会出现打包出来的bunder中还是有es6，费解

  entry: {
    vendor: ['vue']
  },
  output: {
    path: resolve('../public/vendor'),
    filename: '[name].dll.js',
    library: '[name]_library',
    environment: {
      arrowFunction: false,
      destructuring: false
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin({
      root: resolve('../public/vendor')
    }),
    // 定义插件
    new webpack.DllPlugin({
      path: resolve('../public/vendor/[name]-manifest.json'),
      name: '[name]_library', // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      context: __dirname,
      entryOnly: true
    })
  ],
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers
      // (i.e. `terser-webpack-plugin`)
      '...'
    ]
  }
};
const spinner = ora('building dll...');
spinner.start();

webpack(dllConfig, (err, stats) => {
  spinner.stop();
  if (err) throw err;

  process.stdout.write(
    `${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    })}\n\n`
  );

  if (stats.hasErrors()) {
    console.log(chalk.red('Build failed with errors.\n'));
    process.exit(1);
  }
});
