'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './lib/ui/water-station/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'lib/express/public/water-station/js')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};