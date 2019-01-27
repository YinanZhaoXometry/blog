const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  dbUrl: 'mongodb://127.0.0.1:27017/blog',
  dbName: 'blog',
  cookieName: 'jwt',
  cookieSecret: 'nuxt_koa_blog',
  jwtSecret: 'kuhe_hello_world',
  servePath: 'public', // 静态资源目录
  hostName: isDevelopment ? 'http://localhost:3030' : 'http://66.42.37.118',  // 服务器域名
  imagePathPrefix: isDevelopment ? 'http://localhost:3030/images/' : '/images/' // 静态图片资源前缀
}