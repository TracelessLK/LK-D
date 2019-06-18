
class Common {
  static get isDev() {
    return process.env.isDev === 'true'
  }
}

Object.freeze(Common)
module.exports = Common
