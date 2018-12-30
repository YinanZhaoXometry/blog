const articleModel = require('../models/article')

module.exports = {

  // 获取文章列表
  getArticles: async (ctx) => {
    try {
      let totalArticleCount = await articleModel.countDocuments()
      let {pageNum, pageSize} = ctx.query
      pageNum = pageNum ? parseInt(pageNum) : 1
      pageSize = parseInt(pageSize)
      let articleList = await articleModel.find(
        {}, 
        null, 
        {
          sort: {time: -1}, 
          skip: (pageNum -1) * pageSize,
          limit: pageSize,
        }
      )
      ctx.body = { articleList, totalArticleCount }
    } catch (err) {
      ctx.body = { err }
    }
  },

  getPopularArticles: async (ctx) => {
    try {
      let {pageNum, pageSize} = ctx.query
      pageNum = pageNum ? parseInt(pageNum) : 1
      pageSize = parseInt(pageSize)
      let popularList = await articleModel.find(
        {}, 
        null, 
        {
          sort: {pv: -1}, 
          limit: pageSize
        }
      )
      ctx.body = { popularList }
    } catch (err) {
      ctx.body = {err}
    }
  },

  // 获取一篇文章
  getOneArticle: async (ctx, next) => {
    try {
      let id = ctx.params.id
      let getOne = articleModel.findOne({_id: id}, null)
      let addPV = articleModel.updateOne({_id: id}, {$inc: {pv: 1}})
      let [article] = await Promise.all([getOne, addPV])
      ctx.body = {
        article
      }
    } catch (err) {
      ctx.body = {
        err
      }
    }
  },

  // 保存文章至数据库
  saveArticle: async (ctx, next) => {
    try {
      let time = {
        ms: new Date().getTime()  //获取服务器系统时间，并定义时间对象
      }
      let {title, content, abstract} = ctx.request.body
      let newDoc = new articleModel({
        title,
        content,
        abstract,
        time
      })
      await newDoc.save()
      ctx.body = {
        code: 1,
        msg: '文章发表成功！'
      }
    } catch (err) {
      console.log("发现问题：",err)
      ctx.body = {
        code: -1,
        msg: '文章发表失败！'
      }
    }
  }

}