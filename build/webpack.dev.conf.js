
const baseConfig = require('./webpack.base.conf');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(baseConfig, {
    output: {
        publicPath: "/"
    },
    devServer: {
        contentBase: [path.resolve(__dirname, '../public/')],
        open: true
    }
});