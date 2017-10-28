
const {join} = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  resolve: {
    extensions: ['.js'],
    alias: {
      'Component': join(__dirname, 'src', 'components', 'component.js')
    },
    modules: [
      join(__dirname, 'src'),
      'node_modules'
    ]
  },

  entry: [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    join(__dirname, 'src', 'index.js')
  ],

  output: {
    path: join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(jpg|png|svg|mp4|ogg)$/,
        use: {
          loader: 'file-loader?name=[path][name].[ext]&publicPath=/&outputPath='
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HTMLWebpackPlugin({
      template: join(__dirname, 'index.html'),
      filename: 'index.html'
    })
  ],

  devServer: {
    host: 'localhost',
    hot: true,
    port: 3000,
    inline: true,
    contentBase: join(__dirname, 'src'),
    historyApiFallback: true
  }
}
