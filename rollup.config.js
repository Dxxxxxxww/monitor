import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import path from 'node:path';

const pkg = process.env.TARGET;

const resolve = (p) => {
  return path.resolve(`${__dirname}/packages/${pkg}`, p);
};

const { buildOptions } = await import(resolve('package.json'));

const formatMap = {
  esm: {
    file: resolve(`dist/${pkg}.es.js`),
    format: 'es',
  },
  cjs: {
    file: resolve(`dist/${pkg}.cjs.js`),
    format: 'cjs',
  },
  umd: {
    file: resolve(`dist/${pkg}.umd.js`),
    format: 'umd',
  },
  iife: {
    file: resolve(`dist/${pkg}.iife.js`),
    format: 'iife',
  },
};

const createConfig = (output) => {
  output.name = buildOptions.name
  return {
    input: resolve('src/index.js'),
    output,
    plugins: [
      // 可以从 json 中导入数据的插件
      json(),
      // 从 node_modules 中引入第三方模块
      nodeResolve(),
    ],
  };
};

export default buildOptions.formats.map((format) => createConfig(formatMap[format]));
