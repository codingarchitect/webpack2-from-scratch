const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAsssetsPlugin = require('optimize-css-assets-webpack-plugin');

const extractLESS = new ExtractTextPlugin('styles.css');
const loaderOptions = new webpack.LoaderOptionsPlugin({
  debug: true
});
module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js'
    },
    resolve: { // These options change how modules are resolved
      extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'], // Automatically resolve certain extensions
      alias: { // Create aliases
        images: path.resolve(__dirname, 'src/assets/images')  // src/assets/images alias
      }
    },
    module: {
        rules: [{
          test: /\.js$/, // files ending with .js
          exclude: /node_modules/, // exclude the node_modules directory
          loader: "babel-loader" // use this (babel-core) loader
        }, {
          test: /\.jsx$/, // files ending with .jsx
          exclude: /node_modules/, // exclude the node_modules directory
          loaders: ['react-hot-loader', 'babel-loader'] // use this (babel-core) loader
        }, { 
          test: /\.less$/, // files ending with .less
          use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({ // HMR for styles
            fallback: 'style-loader',
            //resolve-url-loader may be chained before less-loader if necessary
            use: ['css-loader', 'less-loader', 'postcss-loader']
          }))
        }, {
          test: /\.(jpe?g|png|gif|svg)$/i, // files ending with .jsx
          exclude: /node_modules/, // exclude the node_modules directory
          include: __dirname,
          loaders: [
            'file-loader?context=src/assets/images/&name=images/[path][name].[ext]',
            {
              loader: 'image-webpack-loader',
              query: {
                mozjpeg: {
                  progressive: true
                },
                gifsicle: {
                  interlaced: false
                },
                optipng: {
                  optimizationLevel: 4
                },
                pngquant: {
                  quality: '75-90',
                  speed: 3
                }
              }
            }
          ]
        }, {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        }
      }]
    },
    plugins: [
      extractLESS,
      loaderOptions
    ],
    devServer: {
      contentBase: path.resolve(__dirname, './public'), // A directory url to serve html content from
      historyApiFallback: true, // fallback to /index.html for Single Page Applications
      inline: true, // inline mode (set to false to disable including client scripts like live reload)
      open: true // open default browser while launching
    },
    devtool: 'eval-source-map' // enable dev tool for better debugging experience
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
    new OptimizeCssAsssetsPlugin()
  );
}