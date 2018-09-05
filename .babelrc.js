const env = process.env.NODE_ENV;

if (env === 'test' || env === 'demo') {
  module.exports = {
    presets: ['env', 'react'],
  };
} else {
  module.exports = {
    presets: [
      [
        'env',
        {
          modules: false,
          targets: {
            browsers: ['last 2 versions', 'ie >= 9'],
          },
        },
      ],
      'react',
    ],
    plugins: [
      'external-helpers',
      'transform-object-rest-spread',
      'babel-plugin-transform-exponentiation-operator',
      'react-hot-loader/babel',
    ],
  };
}
