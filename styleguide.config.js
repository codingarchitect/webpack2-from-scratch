const path = require('path');
var webpackConfig = require('./webpack.config.js');
webpackConfig.entry.push('https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css');
webpackConfig.entry.push('https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css');
webpackConfig.module.rules.push({ 
  test: /\.css$/, // files ending with .css
  loaders: ['style-loader', 'css-loader', 'postcss-loader']
});
webpackConfig.module.rules.push({test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader'});
webpackConfig.module.rules.push({test: /\.(woff|woff2)$/, use: 'url-loader?prefix=font/&limit=5000'});
webpackConfig.module.rules.push({test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream'});
webpackConfig.module.rules.push({test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml'});

module.exports = {
  components: 'src/app/pages/**/[A-Z]*.jsx',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/app/shared/utils/docs/Wrapper')
  },
  skipComponentsWithoutExample: true,
  webpackConfig: Object.assign({}, webpackConfig)
};
