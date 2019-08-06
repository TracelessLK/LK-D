const path = require('path')
const childProcess = require('child_process')
const rootDir = path.resolve(__dirname, '../')
const storePath = path.resolve(rootDir, 'store/LK.db')

childProcess.execSync(`
open ${storePath}
`)
