module.exports = {
  dbUrl: 'mongodb://127.0.0.1:27017/blog',
  dbName: 'blog',
  cookieName: 'jwt',
  cookieSecret: 'nuxt_koa_blog',
  jwtSecret: 'kuhe_hello_world',
  hostName: 'http://localhost:3030',  // 服务器域名
  servePath: 'public', // 静态资源目录
  imagePathPrefix: 'http://localhost:3030/images/'  // 静态图片资源前缀
}