const path = require("path");
const config = require('./config');
const utils = require('./utils');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let devMode = utils.isDev();

module.exports = {
    mode: devMode ? 'development' : 'production',
    devtool: 'eval-source-map',
    entry: {
        index: './src/index.js'
        // ball: './test/balls.js',
        // canBall: './test/balls-can.js'，
        // functions: './test/functions.js'
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
            },
            {
                test: /\.can$/,
                loader: 'can-loader'
            }
        ]
    },
    resolveLoader: {
        modules: ['node_modules', 'src']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../index.html')
        })
    ]
};
