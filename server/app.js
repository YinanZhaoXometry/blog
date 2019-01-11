// 用到的elemmentUI组件：el-alert

const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const chalk = require('chalk')

// const session = require('koa-generic-session')
const MongoStore = require('koa-generic-session-mongo')
// const session = require('koa-session')
// const MongooseStore = require('koa-session-mongoose')
const session = require('koa-session-minimal')


const cors = require('koa2-cors');

const router = require('./routes')
const config = require('./config/default') 

const app = new Koa()

app.use(cors({
    origin: 'http://localhost:8080',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }
))

// 美化控制台输出
var success = chalk.green.bold
var error = chalk.red.bold

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')
//   // ctx.set('Access-Control-Allow-Credentials', 'true')
//   ctx.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
//   ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-type');
//   await next()
// })

// 连接到MongoDB
mongoose.connect(config.dbURI, {useNewUrlParser:true}, function(err) {
  if(err) 
    console.log(error('数据库连接失败！'))
  else 
    console.log(success('数据库连接成功！'))
})


app.keys = ['nuxt koa blog']   // 设置cookie签名秘钥

app.use(session({
  store: new MongoStore({
    db: config.dbName,
    ttl: 1000 * 60 * 60* 24 * 7,   // Session timeouts (time-to-live), defaults to cookie maxAge
  }),
  cookie: { maxAge: 1000 * 20 }  // 7days
}))

// routes
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});




// session 配置信息
// const CONFIG = {
//   key: 'koa:sess',
//   maxAge: 86400000,
//   overwrite: true,
//   httpOnly: true,
//   signed: true,
//   rolling: false,
//   store: new SessionStore({
//       collection: 'navigation', //数据库集合
//       connection: mongoose,     // 数据库链接实例
//       expires: 86400, // 默认时间为1天
//       name: 'session' // 保存session的表名称
//   })
// };

// 以中间件的方式使用session
// app.use(session(CONFIG, app));



// app.use(session({
//   maxAge: 30*24*60*60*1000,    // 设置cookie有效期，30天转换成毫秒数
//   store: new MongooseStore({ 
// //   // 这个是关键，connection的值是mongoose
//   connection: mongoose,
//   expires: 86400, // 1 day is the default
// })   // 服务器端，将session信息保存在 MongoDB 中
// }, app))


module.exports = app
