import fs from 'node:fs';
import { execa } from 'execa';
// readdirSync 读取 packages 目录下的文件/文件夹
const packages = fs.readdirSync('packages').filter((p) => {
  // statSync 返回一个文件详细信息对象，再调用其 isDirectory 方法判断是否是一个文件夹
  return fs.statSync(`packages/${p}`).isDirectory();
});

const build = async (pkg) => {
  // -c 读取文件配置，没有跟随目录名，默认读取根目录下的 rollup.config.js
  // --environment 注入一个环境变量，这里是 TARGET，值为 pkg，可以在 process.env.TARGET 上读取
  await execa('rollup', ['-c', '--environment', `TARGET:${pkg}`], {
    stdio: 'inherit',
  });
};

const runParallel = (targets, buildFn) => {
  const res = [];
  for (const target of targets) {
    res.push(buildFn(target));
  }
  return Promise.all(res);
};

runParallel(packages, build)
