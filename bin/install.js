#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const readline = require("readline");
const { parseArgs } = require("node:util");

let values, positionals;
try {
  ({ values, positionals } = parseArgs({
    options: {
      global: { type: "boolean", short: "g", default: false },
      local: { type: "boolean", short: "l", default: false },
      force: { type: "boolean", short: "f", default: false },
      yes: { type: "boolean", short: "y", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
    allowPositionals: true,
  }));
} catch (err) {
  console.error(`❌ ${err.message}`);
  process.exit(1);
}

const command = positionals[0] || "install";

if (values.help) {
  console.log(`
Uso: npx study-trails <command> [options]

Commands:
  install       Install the agent, commands and skills (default)
  uninstall     Remove only the files installed by this package

Options:
  -l, --local   Use ./.opencode (default)
  -g, --global  Use ~/.config/opencode
  -f, --force   (install) Overwrites existing files
  -y, --yes     (uninstall) Does not require confirmation
  -h, --help    Show this help
`);
  process.exit(0);
}

if (!["install", "uninstall"].includes(command)) {
  console.error(`❌ Unknown command: "${command}". Use: install or uninstall`);
  process.exit(1);
}

if (values.global && values.local) {
  console.error("❌ Use --global or --local, but not both at the same time.");
  process.exit(1);
}

const source = path.join(__dirname, "..", ".opencode");
const target = values.global
  ? path.join(os.homedir(), ".config", "opencode")
  : path.join(process.cwd(), ".opencode");

if (!fs.existsSync(source)) {
  console.error("❌ The .opencode folder was not found in the package.");
  process.exit(1);
}

const folders = fs
  .readdirSync(source, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

if (folders.length === 0) {
  console.error("❌ No folders found in .opencode.");
  process.exit(1);
}

function listFiles(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory()
      ? listFiles(full, base)
      : [path.relative(base, full)];
  });
}

function removeEmptyDirs(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) removeEmptyDirs(path.join(dir, e.name));
  }
  if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
}

function confirm(question) {
  if (!process.stdin.isTTY) {
    console.error("❌ Terminal não interativo. Use --yes para confirmar.");
    process.exit(1);
  }
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (a) => {
      rl.close();
      resolve(["s", "sim", "y", "yes"].includes(a.trim().toLowerCase()));
    }),
  );
}

function install() {
  console.log(`\n🚀 Installing in: ${target}\n`);
  fs.mkdirSync(target, { recursive: true });

  for (const folder of folders) {
    fs.cpSync(path.join(source, folder), path.join(target, folder), {
      recursive: true,
      force: values.force,
      errorOnExist: false,
    });
    console.log(`  ✅ ${folder}/`);
  }
  console.log("\n🎉 Installation finished!\n");
}

async function uninstall() {
  if (!fs.existsSync(target)) {
    console.log(`\nℹ️  Nothing to remove: ${target} does not exist.\n`);
    return;
  }

  console.log(`\n🗑️  Uninstalling from: ${target}`);
  console.log("   Only the files included in this package will be removed.\n");

  if (!values.yes && !(await confirm("Continue? (y/N): "))) {
    console.log("Canceled.");
    return;
  }

  for (const folder of folders) {
    const folderTarget = path.join(target, folder);
    if (!fs.existsSync(folderTarget)) continue;

    for (const rel of listFiles(path.join(source, folder))) {
      fs.rmSync(path.join(folderTarget, rel), { force: true });
    }
    removeEmptyDirs(folderTarget);

    console.log(
      fs.existsSync(folderTarget)
        ? `  ⚠️  ${folder}/ maintained (contains files that are not part of the package)`
        : `  ✅ ${folder}/ removed`,
    );
  }

  if (fs.existsSync(target) && fs.readdirSync(target).length === 0) {
    fs.rmdirSync(target);
  }
  console.log("\n🎉 Uninstallation complete!\n");
}

(command === "install" ? Promise.resolve(install()) : uninstall()).catch(
  (err) => {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  },
);
