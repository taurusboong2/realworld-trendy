const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    port: 8080,
    host: '0.0.0.0',
    historyApiFallback: true,
    static: {
      directory: './dist',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) =>
        '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
        htmlWebpackPlugin.options.title +
        '</title></head><body><div id="app"></div></body></html>',
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
};

module.exports = config;
