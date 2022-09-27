const path = require('path');
  module.exports = {
    // our entry point file (index.js)
    entry: './src/js/index.js',
    // how to output the files: create a file called "main.js" in a folder called "dist" with all of our compiled code
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };