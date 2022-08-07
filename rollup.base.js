import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import packageInfo from './package.json'
import rollupJson from '@rollup/plugin-json'

const plugins = [
  esbuild({
    include: /\.[jt]sx?$/,
    exclude: /node_modules/,
    sourceMap: true,
    minify: process.env.NODE_ENV === 'production',
    target: 'es2015',
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    define: {
      __VERSION__: `"${packageInfo.version}"`,
    },
    tsconfig: 'tsconfig.json',
    loaders: {
      '.json': 'json',
      '.js': 'jsx',
    },
  }),
  nodeResolve(),
  commonjs(),
  rollupJson()
]

export {
  plugins
}
