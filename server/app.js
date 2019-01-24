// 用到的elemmentUI组件：el-alert
const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const chalk = require('chalk')
const cors = require('koa2-cors');
const path = require('path')
const koaStatic = require('koa-static')

const router = require('./routes')
const config = require('./config')
const auth  = require('./middlewares/auth') 
const app = new Koa()

// 美化控制台输出
const success = chalk.green.bold
const error = chalk.red.bold

// 连接到MongoDB
mongoose.connect(config.dbUrl, {useNewUrlParser:true}, function(err) {
  if(err) 
    console.log(error('数据库连接失败！'))
  else 
    console.log(success('数据库连接成功！'))
})

// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')
//   // ctx.set('Access-Control-Allow-Credentials', 'true')
//   ctx.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
//   ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-type');
//   await next()
// })

// middlewares
app.use(cors({
    origin: 'http://localhost:8080',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }
))

// error handler
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})

app.use(koaStatic(
  path.join(__dirname, config.servePath),
  { maxage: 365 * 12 * 30 * 24 * 60 * 60 * 1000 }  // 缓存时间1年
))

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', { extension: 'ejs' }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.keys = [config.cookieSecret]   // 设置cookie签名秘钥

app.use(auth.authUser)

// routes
app.use(router.routes(), router.allowedMethods())

// Centralized error handling
app.on('error', async (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
