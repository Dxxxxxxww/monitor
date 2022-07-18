import fs from "node:fs";
import path from "node:path";
import inquirer from "inquirer";
import "zx/globals";

/*
 * TODO
 *  1. 判断文件是否已存在，已存在冲突解决
 *  2. rollup，ts引入
 *  3. 子包 package.json 中 packagename 修改
 * */

const cwd = process.cwd();
const DIR_LIST = ["browser", "core"];

async function init() {
  try {
    // 单个模块添加，需要抽离
    // const { targetDir } = await inquirer.prompt([
    //   {
    //     type: "input",
    //     name: "targetDir",
    //     message: "input a dir: ",
    //   },
    // ]);
    await createWorkspace();
    // 不需要串行
    DIR_LIST.forEach(async (item) => {
      const root = await createDir(item);
      await npmInit(root);
    });
  } catch (e) {
    console.log(e.message);
  }
}

async function createWorkspace() {
  await fs.writeFile("pnpm-workspace.yaml", "packages: 'packages/*'");
}

async function createDir(dir) {
  let root = path.join(cwd, "packages", dir);
  await fs.mkdirSync(root, { recursive: true });
  return root;
}

async function npmInit(dir) {
  cd(`${dir}`);
  await $`npm init -y`;
}

init();
