import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss'

import pkg from './package.json';

export default {
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  external: ['react', 'react-dom', 'react-modal', 'prop-types'],
  plugins: [
    postcss({
      modules: true,
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    uglify({
      mangle: false,
      output: {
        comments: true,
        beautify: true,
      },
    }),
  ],
};
