import path from 'path'
import { plugins } from '../../rollup.base'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias'
import rimraf from 'rimraf';

const input = 'src/index.ts'

const corePath = path.join(__dirname, '../core')
rimraf(path.join(corePath, 'esm'), () => undefined)

export default [
  {
    input,
    output: {
      format: 'iife',
      name: 'FEMonitorBrowser',
      sourcemap: true,
      strict: true,
      file: 'dist/index.iife.js'
    },
    context: 'window',
    plugins: [
      ...plugins,
      alias({
        entries: [
          {
            find: '@fe-monitor/core',
            replacement: path.join(corePath, 'src')
          },
        ],
        customResolver: nodeResolve({ extensions: [".tsx", ".ts"] }),
      })
    ]
  }
]
