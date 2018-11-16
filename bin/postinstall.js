const {CliUtil} = require('@ys/collection')
const {execSync} = CliUtil
const path = require('path')
const rootDir = path.resolve(__dirname, '../')
const resource = path.resolve(rootDir, 'resource')
const sqliteNodeFileName = 'node_sqlite3.node'
const sqliteElectronFolder = path.resolve(rootDir, 'node_modules/sqlite3/lib/binding/electron-v3.0-darwin-x64')
const sqliteNode = path.resolve(sqliteElectronFolder, sqliteNodeFileName)
const fse = require('fs-extra')

const option =  {
  cwd: rootDir
}
if (!fse.existsSync(sqliteNode)) {
  fse.ensureDirSync(sqliteElectronFolder)
  fse.copySync(path.resolve(resource, sqliteNodeFileName), path.resolve(sqliteElectronFolder, sqliteNodeFileName))
  // execSync(`npm run install:sqlite3`, option)
}
// execSync(`npm run asars && npm run build`, option)

console.log('postinstall finished')
