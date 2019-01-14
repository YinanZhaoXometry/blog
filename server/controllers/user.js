const userModel = require('../models/user')
const crypto = require('crypto')
const jwt = require('jwt-simple')
const config = require('../config')
const moment = require('moment');

module.exports = {
  // 定义登陆验证方法
  async login (ctx, next) {
    let md5 = crypto.createHash('md5')  // 使用 crypto 模块将输入的登陆密码转换为 MD5 加密格式
    var pwdMd5 = md5.update(ctx.request.body.pwd).digest('hex')
    let userDoc = await userModel.findOne({name: ctx.request.body.name}, null)   // 在数据库中按照输入的登录名查找
    if(!userDoc) {
      ctx.throw(401, '用户不存在！')
    } else {
      if(pwdMd5 !== userDoc.password) {
        ctx.throw(401, '用户名或密码错误！')
      } else {
        let payload = {
          id: userDoc._id,
          name: userDoc.name,
          expires: moment().add(7, 'days').valueOf()  // 指定token过期时间（毫秒数）
        }
        const token = jwt.encode(payload, config.jwtSecret)
        let opts = {
          path: '/',
          signed: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,  // 指定cookie存活时效（毫秒数）
          httpOnly: true
        }
        ctx.cookies.set(config.cookieName, token, opts)
        ctx.body = {
          message: '登陆成功！',
        }
      }
    }
  },

  // 定义退出登录方法
  logout (ctx, next) {
    ctx.request.user = null
    ctx.cookies.set(config.cookieName, null)
    ctx.cookies.set(config.cookieName+'.sig', null)
    ctx.body = {
      message: '已退出登录'
    }
  }

}