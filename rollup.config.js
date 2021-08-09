import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

export default {
  input: './src/index.js',
  output: [
    {
      entryFileNames: pkg.main,
      format: 'cjs',
      exports: 'named',
      dir: __dirname,
    },
    {
      entryFileNames: pkg.module,
      format: 'esm',
      exports: 'named',
      dir: __dirname,
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
  ],
  plugins: [
    nodeResolve(),
    postcss({ extract: 'style.css' }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
