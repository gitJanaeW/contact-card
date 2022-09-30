const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  // our entry point file (index.js)
  entry: './src/js/index.js',
    // how to output the files: create a file called "main.js" in a folder called "dist" with all of our compiled code
    output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin',
    }),

  ],
  module: {
    rules: [
      {
        // identify image files
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // identify css files
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};