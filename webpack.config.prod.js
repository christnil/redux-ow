var path = require('path');
var webpack = require('webpack');

module.exports = [
   {
      devtool: 'cheap-module-eval-source-map',
      entry: [
         './src/client/index'
      ],
      output: {
         path: path.join(__dirname, 'public'),
         filename: 'bundle.js',
         publicPath: '/public/'
      },
      module: {
         loaders: [
            {
               test: /\.js$/,
               loaders: ['babel'],
               exclude: /node_modules/,
               include: __dirname
            },
            {
               test: /\.css?$/,
               loaders: ['style', 'raw'],
               include: __dirname
            },
            {
               test: /\.jsx$/,
               loaders: ['babel'],
               exclude: /node_modules/,
               include: __dirname
            },
            {
               test: /\.scss$/,
               loaders: [path.join(__dirname, 'myloader')]
            }
         ]
      }
   }
];
