const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const myPath = '/var/www/html/wp-content/themes/clf-wp-starter/';
const myPath = '/var/www/clf.com/public_html/wp-content/themes/clf-wp-starter/';

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
            new TerserJSPlugin({
                cache: false,
                parallel: true,
                sourceMap: true,
                terserOptions: {}
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
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
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: './assets/gfx/',
            to: path.resolve(__dirname, myPath + 'assets/gfx/')
        },
            {
                from: './',
                to: path.resolve(__dirname, myPath),
                ignore: ['.git/**/*', '.git/*.*', './*.js', 'assets/**/*', 'assets/*.*', 'node_modules/**/*', 'node_modules/*.*']
            }
        ]),
        new MiniCssExtractPlugin({
            filename: './[name].min.css'
        })
    ]
};
