import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

module.exports = {
    devtool: 'source-map',
    entry: {
        demo: './src/examples/cats/app',
    },
    output: {
        path: 'build',
        filename: 'static/[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: './src/examples/cats/index.html'
        }),
        new webpack.EnvironmentPlugin([
            "NODE_ENV",
        ]),
        new webpack.NoErrorsPlugin(),
    ],
    resolve: {
        alias: {
            // For react-hot-loader 1.x issue (https://github.com/gaearon/react-hot-loader/issues/417)
            'react/lib/ReactMount': 'react-dom/lib/ReactMount',
        },
    },
    postcss: [
        autoprefixer({ browsers: ['IE >= 9', '> 1%'] }),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&-autoprefixer&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
                    'postcss-loader',
                    'sass-loader',
                ],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loaders: [
                    'file-loader?name=static/[name]-[hash:6].[ext]',
                ],
                include: path.join(__dirname, 'src')
            },
        ],
    },
    devServer: {
        contentBase: 'build',
        port: 3001,
        stats: {
            chunks: false,
            hash: false,
            version: false,
            assets: false,
            children: false,
        },
    },
};
