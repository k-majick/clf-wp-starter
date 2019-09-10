const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const myPath = '../wordpress/wp-content/themes/clf-wp-starter-dist/';

module.exports = {
  entry: {
    main: './assets/index.js'
  },
  output: {
    path: path.resolve(__dirname, myPath + 'assets/'),
    publicPath: '/',
    filename: './[name].min.js'
  },
  devServer: {
    contentBase: path.join(__dirname, myPath),
    compress: true,
    port: 9999
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [{
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: "[name].[ext]",
            publicPath: 'gfx/',
            outputPath: 'gfx/'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
        from: './assets/gfx/',
        to: path.resolve(__dirname, myPath + 'assets/gfx/')
      },
      {
        from: './*.php',
        to: path.resolve(__dirname, myPath)
      },
      {
        from: './assets/inc/*.php',
        to: path.resolve(__dirname, myPath)
      },
      {
        from: './*.css',
        to: path.resolve(__dirname, myPath)
      }
    ]),

    new MiniCssExtractPlugin({
      filename: './[name].min.css'
    })
  ]
};
