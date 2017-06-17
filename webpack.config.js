module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
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
        }]
    }
};