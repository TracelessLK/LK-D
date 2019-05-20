const path = require('path')
const fs = require('fs')
// const _ = require('lodash')

const { getGoldenHeight } = require('../util/Independent')

const rootDir = path.resolve(__dirname, '../')

const minWidth = 780
const minHeight = getGoldenHeight(this.minWidth)
const config = {
  checkUpdateUrl: 'https://raw.githubusercontent.com/TracelessLK/LK-D/publish/upgrade.json',
  minWidth,
  minHeight,
  isDev: false, // 是否开发模式
  // 检查更新超时时长
  checkUpdateTimeout: 1000 * 5,
  // 数据库文件路径
  dbFilePath: path.resolve(rootDir, 'store/LK.db'),
  // 展示消息记录数量
  recordNumber: 50
}

const unversionedPath = path.resolve(__dirname, 'unversioned.js')
if (fs.existsSync(unversionedPath)) {
  Object.assign(config, require(unversionedPath))
}

Object.freeze(config)
module.exports = config
