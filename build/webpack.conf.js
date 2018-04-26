const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [path.join(__dirname, '../src')]
      }
    ]
  }
}
