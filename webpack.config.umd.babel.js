import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

module.exports = {
    entry: {
        'react-image-lightbox': './src/index',
    },
    output: {
        path: path.join(__dirname, 'dist', 'umd'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'ReactImageLightbox',
    },
    resolve: {
        extensions: ['', '.js']
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.EnvironmentPlugin([
            "NODE_ENV",
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: false,
            beautify: true,
            comments: true,
        }),
    ],
    postcss: [
        autoprefixer({ browsers: ['IE >= 9', '> 1%'] }),
    ],
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
        'react-modal': 'react-modal',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loaders: [
                    'isomorphic-style-loader',
                    'css-loader?modules&-autoprefixer&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
                    'postcss-loader',
                    'sass-loader',
                ],
                include: path.join(__dirname, 'src')
            },
        ]
    }
};
