import { plugins } from '../../rollup.base';

const input = 'src/index.ts';
export default [
  {
    input,
    output: {
      format: 'iife',
      name: 'FEMonitorBrowser',
      sourcemap: true,
      strict: true,
      file: 'dist/index.iife.js',
      globals: {
        '@monitor-fe/core': 'FEMonitorCore',
      },
    },
    context: 'window',
    plugins,
  },
  {
    input,
    output: {
      format: 'umd',
      name: 'FEMonitorBrowser',
      sourcemap: true,
      file: 'dist/index.umd.js',
      globals: {
        // 指定 umd/ilife 包中外部导入所必需的 id: variableName (第三方包在函数中的变量名)。
        '@monitor-fe/core': 'coreTest',
      },
    },
    plugins,
  },
];
