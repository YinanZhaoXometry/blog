
module.exports = {
  dbUrl: 'mongodb://127.0.0.1:27017/blog',
  dbName: 'blog',
  cookieName: 'jwt',
  cookieSecret: 'nuxt_koa_blog',
  jwtSecret: 'kuhe_hello_world',
  servePath: process.env.NODE_ENV === 'development'  // 静态资源目录
    ? 'public'
    : '/home/zhaoyn/kuhe/public', 
  hostName: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3030' 
    : 'http://kuhe.io',  // 服务器域名
  imagePathPrefix: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3030/images/' 
    : '/images/', // 静态图片资源前缀
  
}