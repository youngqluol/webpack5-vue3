const path = require('path');
const resolve = p => path.resolve(__dirname, p);

module.exports = {
  entry: resolve('../src/main.js'),

  output: {
    filename: 'app.js',
    path: resolve('./dist')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },

      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
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
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        },
        exclude: /node_modules/
      }
    ]
  }
}