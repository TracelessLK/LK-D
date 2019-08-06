const path = require('path')

const { sep } = path
const rootDir = path.resolve(__dirname, '../')
const chalk = require('chalk')
const childProcess = require('child_process')
const debug = require('debug')('debug')

chalk.green('sqlite3 generated successfully')
childProcess.execSync(`npm i`, {
  cwd: path.resolve(rootDir, 'node_modules', 'sqlite3')
})
const cmd = `
npx asar pack node_modules${sep}sqlite3 asars${sep}sqlite3.asar
`.trim()
debug({ cmd })

childProcess.execSync(cmd)

console.log(chalk.green.bold('sqlite3 generated successfully'))
