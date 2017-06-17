const path = require('path');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{ 
          test: /\.css$/, // files ending with .css
          loader: ['style-loader', 'css-loader'] // use this css-loader and pipe that output to style-loader
        }, {
          test: /\.js$/, // files ending with .js
          exclude: /node_modules/, // exclude the node_modules directory
          loader: "babel-loader" // use this (babel-core) loader
        }, { 
          test: /\.less$/, // files ending with .less
          loader: ['style-loader', 'css-loader', 'less-loader'] // use the less-loader and pipe the output to css-loader and pipe that output to style-loader
        }]
    }
};