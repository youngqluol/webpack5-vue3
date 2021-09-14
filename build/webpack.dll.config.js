const path = require('path');
const resolve = p => path.resolve(__dirname, p);
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');

let dllConfig = {
  mode: 'production',
  entry: {
    vendor: ['vue', 'element-plus']
  },
  output: {
    path: resolve('../public/vendor'),
    filename: '[name].dll.js',
    library: '[name]_library' // 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
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
      name: '[name]_library',
      context: __dirname
    })
  ]
};
const spinner = ora('building dll...');
spinner.start();

webpack(dllConfig, (err, stats) => {
  spinner.stop();
  if (err) throw err;

  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n'
  );

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'));
    process.exit(1);
  }
});
