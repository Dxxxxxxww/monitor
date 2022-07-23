import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'node:path';

const pkg = process.env.TARGET;

const resolve = (p) => {
  console.log('path:::', path.resolve(`${__dirname}/packages/${pkg}`, p));
  return path.resolve(`${__dirname}/packages/${pkg}`, p);
};

// const { buildOptions } = await import(resolve('package.json'));

const formatMap = {
  es: {
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
  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [
      typescript({
        tsconfig: resolve('./tsconfig.json'),
      }),
      nodeResolve(),
      // 可以从 json 中导入数据的插件
      json(),
    ],
  };
};

// export default buildOptions.formats.map((format) => createConfig(formatMap[format]));

module.exports = (async () => {
  const { buildOptions } = await import(resolve('package.json'));

  // Would be how you set the "exports"
  return buildOptions.formats.map((format) =>
    createConfig({ ...formatMap[format], name: buildOptions.name })
  );
})();
