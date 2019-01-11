module.exports = {
  // 定义函数，检查用户是否已登录，如未登录，则执行相关逻辑逻辑
  checkLogin (ctx, next) {
    if (!ctx.session.user)
      return ctx.body = {
        status: 401,
        message: '未登录'
      }
    next()
  }
}