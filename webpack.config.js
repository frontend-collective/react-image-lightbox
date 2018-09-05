const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const target = process.env.TARGET || 'umd';

const styleLoader = {
  loader: 'isomorphic-style-loader',
  options: { insertAt: 'top' },
};

const fileLoader = {
  loader: 'file-loader',
  options: { name: 'static/[name].[ext]' },
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      autoprefixer({ browsers: ['IE >= 9', 'last 2 versions', '> 1%'] }),
    ],
  },
};

const cssLoader = isLocal => ({
  loader: 'css-loader',
  options: {
    modules: true,
    '-autoprefixer': true,
    importLoaders: true,
    localIdentName: isLocal ? 'ril__[local]' : null,
  },
});

const config = {
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: false,
      beautify: true,
      comments: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.scss$/,
        use: [styleLoader, cssLoader(true), postcssLoader, 'sass-loader'],
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        // Used for importing css from modules in node_modules
        test: /\.css$/,
        use: [styleLoader, cssLoader(false), postcssLoader],
      },
    ],
  },
};

switch (target) {
  case 'development':
    config.devtool = 'eval';
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|ico|svg)$/,
      use: [fileLoader],
      exclude: path.join(__dirname, 'node_modules'),
    });
    config.entry = ['react-hot-loader/patch', './examples/cats/index'];
    config.output = {
      path: path.join(__dirname, 'build'),
      filename: 'static/[name].js',
    };
    config.plugins = [
      new HtmlWebpackPlugin({
        inject: true,
        template: './examples/cats/index.html',
      }),
      new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
      new webpack.NoEmitOnErrorsPlugin(),
    ];
    config.devServer = {
      contentBase: path.join(__dirname, 'build'),
      port: process.env.PORT || 3001,
      host: '0.0.0.0',
      disableHostCheck: true,
      stats: 'minimal',
    };

    break;
  case 'demo':
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|ico|svg)$/,
      use: [fileLoader],
      exclude: path.join(__dirname, 'node_modules'),
    });
    config.entry = './examples/cats/index';
    config.output = {
      path: path.join(__dirname, 'build'),
      filename: 'static/[name].js',
    };
    config.plugins = [
      new HtmlWebpackPlugin({
        inject: true,
        template: './examples/cats/index.html',
      }),
      new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ];

    break;
  default:
}

module.exports = config;
