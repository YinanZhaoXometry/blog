const config = require('../config')
const jwt = require('jwt-simple')

module.exports = {
  async authUser (ctx, next) {
    // 定义身份验证函数，在每次请求时验证用户身份：读取cookie中保存的token、解密，并将解密信息保存在ctx.request对象中
    const token = ctx.cookies.get(config.cookieName, {signed: true})
    if(token) {
      try {
        const decoded = jwt.decode(token, config.jwtSecret,)
        if (decoded.exp <= Date.now()) {
          ctx.throw(400, '您的登陆已过期，请重新登陆')
        }
        ctx.request.user = decoded   // 将token信息保存至ctx.request对象的user属性中
      } catch (err) {
        ctx.cookies.set(config.cookieName, null)
        ctx.cookies.set(config.cookieName+'.sig', null)
        ctx.throw(403, err)
      }
    }
    await next()

  },

  // 定义函数，只允许已登录用户执行后续业务逻辑
  async allowIfLoggedin (ctx, next) {
    if (!ctx.request.user) {
      ctx.throw(403, '请先登录')
    }
    await next()
  }
}