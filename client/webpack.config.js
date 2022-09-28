const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
  module.exports = {
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
      })
    ],
    mode: 'development',
    module: {
      rules: [
        {
          // identify image files
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          // identify css files
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
      ]
    }
  };