const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

 __webpack_base_uri__ = 'http://localhost:8081';
 
module.exports = {
    mode: 'development',
    entry: {
        app: [path.resolve(__dirname, './assets/js/main.js')],
    },
    devServer: {
        port: 8081,
        hot: false,
        liveReload: true,
        watchFiles: [path.resolve(__dirname, './assets/js/main.js')],
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'js/[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './assets/index.html'),
            filename: './index.html',
            inject: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    }

}