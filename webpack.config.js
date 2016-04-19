var path = require('path');
var webpack = require('webpack');

var PROD = JSON.parse(process.env.production || '0')

module.exports = {
  entry: path.resolve(__dirname, 'app/app.jsx'),
  output: {
    path: path.resolve(__dirname, 'out'),
    publicPath: 'out/',
    filename: 'app.js'
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: {
        comments: false
      }
    })
  ] : [],
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass']},

      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&mimetype=image/svg+xml' },

      { test: /\.json$/, loader: 'json-loader' },
      { test: /corbel\.js$/, loaders: ['imports?this=>window'] }
    ]
  },
    node: {
    net: "empty",
    tls: "empty",
    fs: "empty"
  }

};
