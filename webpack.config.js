const { BADRESP } = require('dns')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path")

module.exports = {
    context: path.join(__dirname, "src"),
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    entry: ["@babel/polyfill", "./index.tsx"],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
        inline: true,
        host: "localhost",
        port: 8080,
        stats: "errors-only",
        hot: true,
        open: true,
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
        })
    ]
}