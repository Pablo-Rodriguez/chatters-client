
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.js'],
    alias: {
      'Component': path.join(__dirname, 'src', 'components', 'component.js')
    },
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },

  entry: path.join(__dirname, 'src', 'index.js'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'development' }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html'
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        ecma: 6,
        compress: true,
        output: {
          beautify: false,
          comments: false 
        }
      }
    })
  ],

  target: 'web',

  devServer: {
    host: '0.0.0.0',
    hot: false,
    port: 3000,
    inline: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true
  }
}
