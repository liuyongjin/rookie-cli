#! /usr/bin/env  node
const { Command } = require("commander");
const exec = require("child_process").exec;
const inquirer = require("inquirer");
// 颜色不生效
const chalk = require("chalk");
// const path = require("path");
// const fs = require("fs-extra");
const pkg = require("../package.json");
// const argv = require("minimist")(process.argv.slice(3));
const program = new Command();
const cliName = Object.keys(pkg.bin)[0];
chalk.enabled = true;
// console.log(cliName);

const templList = [
  {
    name: "webpack-react-redux-router-ts-templ",
    value: "git clone https://github.com/liuyongjin/pure_admin.git",
  },
  {
    name: "vite-react-redux-router-ts-templ",
    value: "git clone https://github.com/liuyongjin/pure_admin.git",
  },
];

// 初始化
function init() {
  // 注册版本命令
  program
    .version(pkg.version, "-v, --version")
    .name(cliName)
    .usage("<command> [options]");

  // const targetDir = argv._[0] || ".";
  // const cwd = process.cwd();
  // const root = path.join(cwd, targetDir);

  // await fs.ensureDir(root);
  // const existing = await fs.readdir(root);
  // if (existing.length) {
  //   console.log(chalk.green(`Error: target directory is not empty.`));
  //   process.exit(1);
  // }

  program
    .command("create")
    .description("create a new project from a template")
    .action(async () => {
      // console.log(templateName, projectName, cmd);
      const { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "选择模板？",
          choices: templList,
        },
      ]);
      console.log(action);
      // cwd: root
      exec(action, {}, function (err, stdout, stderr) {
        if (err) {
          console.log(err);
          console.log(stdout);
          console.log(stderr);
        } else {
          console.log(chalk.green("success"));
        }
      });
    });

  // commander解析参数
  program.parse(process.argv);
}

init();
// .catch((e) => {
//   console.error(e);
// });
