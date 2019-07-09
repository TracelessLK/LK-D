const path = require('path')

const rootDir = path.resolve(__dirname, '../')
const CommonUtil = require('../src/util/Common')

const config = {
  mode: CommonUtil.isDev ? 'development' : 'production',
  bail: true,
  devtool: CommonUtil.isDev ? 'eval' : 'source-map',
  entry: path.resolve(rootDir, 'src/render/index.js'),
  output: {

  }


}

Object.freeze(config)

module.exports = config
