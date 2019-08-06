const { CliUtil } = require('@ys/collection')

const { execSync } = CliUtil
const path = require('path')

const rootDir = path.resolve(__dirname, '../')
const resource = path.resolve(rootDir, 'resource')
const sqliteNodeFileName = 'node_sqlite3.node'
const sqliteElectronFolder = path.resolve(rootDir, `node_modules/sqlite3/lib/binding/electron-v3.0-${process.platform}-x64`)
const sqliteNode = path.resolve(sqliteElectronFolder, sqliteNodeFileName)
const fse = require('fs-extra')
const _ = require('lodash')

const constant = require(path.resolve(rootDir, 'constant'))
const folderName = _.findKey(constant.platform, v => v === process.platform)

const option = {
  cwd: rootDir
}
const resourceNodePath = path.resolve(resource, folderName, sqliteNodeFileName)
if (!fse.existsSync(sqliteNode)) {
  if (!fse.existsSync(resourceNodePath)) {
    execSync(`npm run install:sqlite3`, option)
  }
  fse.ensureDirSync(sqliteElectronFolder)
  fse.copySync(resourceNodePath, path.resolve(sqliteElectronFolder, sqliteNodeFileName))
}
// fixme: always fail, Error: EBADF: bad file descriptor, uv_tty_init
// execSync(`npm run asars`, option)
// execSync(`node build`, option)
console.log('postinstall finished')
