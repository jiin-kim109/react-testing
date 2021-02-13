const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    mode: 'production',
    context: path.join(__dirname, "src"),
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    entry: ["@babel/polyfill", "./index.tsx"],
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: '/',
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: ["ts-loader","eslint-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,                       
                exclude: /node_modules/,                 
                use: 'babel-loader',		
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "assets/image/[name].[ext]?[hash]"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            hash: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
            },
        })
    ]
}