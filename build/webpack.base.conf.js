const path = require("path");
const config = require('./config');
const utils = require('./utils');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let devMode = utils.isDev();

module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: config.build.dist,
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../index.html')
        })
    ]
};