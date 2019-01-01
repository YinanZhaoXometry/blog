const articleModel = require('../models/article')
const categoryController = require('./category')

module.exports = {

  // 获取 前台|后台 文章列表
  getArticles: async (ctx, next) => {
    try {
      let totalArticleCount = await articleModel.countDocuments()
      let {pageNum, pageSize} = ctx.query
      pageNum = pageNum ? parseInt(pageNum) : 1
      pageSize = parseInt(pageSize)
      let articleList = await articleModel.find(
        {}, 
        {}, 
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

  // 获取前台主页文章热门列表
  getPopularArticles: async (ctx, next) => {
    try {
      let {pageNum, pageSize} = ctx.query
      pageNum = pageNum ? parseInt(pageNum) : 1
      pageSize = parseInt(pageSize)
      let popularList = await articleModel.find(
        {}, 
        {}, 
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

  // 获取前台单篇文章内容
  getOneArticle: async (ctx, next) => {
    try {
      console.log(ctx.path)
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

  // 发布文章（保存至数据库）
  saveArticle: async (ctx, next) => {
    try {
      // 保存不同时间格式，方便后续使用（精确到毫秒、年、月、日、分钟）
      let date = new Date()
      let toYear = date.getFullYear()
      let toMonth = year+ '-' + ( (date.getMonth() +1 ) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1) )
      let toDay = month +'-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate())
      let toMinute = day + " " + date.getHours() + ":"
        + ( date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes() )
      let time = {
        toMs: date.getTime(),  //获取服务器系统时间，并定义时间对象
        toYear,
        toMonth,
        toDay,
        toMinute,
      }
      let {title, content, abstract, tags, category} = ctx.request.body
      let newDoc = new articleModel({
        title,
        content,
        abstract,
        time,
        tags,
        category
      })
      let articleDoc = await newDoc.save()
      let result = await categoryController.saveToCategory(articleDoc.category, articleDoc._id)
      console.log(result)
      if(!result.nModified)
        throw new Error('文章类型未成功保存至数据库！')
      ctx.body = {
        success: true,
        message: '文章发表成功！'
      }
    } catch (err) {
      console.log("发现问题：",err)
      ctx.body = {
        success: false,
        message: '文章发表失败！'
      }
    }
  },

  // 修改文章方法
  updateArticle: async function (ctx, next) {
    try{
      let {id, content, category} = ctx.request.body
      let getUpdateResult = articleModel.updateOne({_id: id}, {$set: {content:content, category:category}})
      let getSaveCateResult = categoryController.saveToCategory(category, id)
      let [updateResult, saveCateResult] = await Promise.all([getUpdateResult, getSaveCateResult])
      if(!updateResult.nModified)
        throw new Error('文章修改未成功保存至数据库')
      if(!saveCateResult.nModified)
        throw new Error('文章类型未成功保存至数据库')
      ctx.body = {
        success: true,
        message:'修改成功！'
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        success: false,
        message:'修改失败'
      }
    }
  },

  // 删除文章方法
  deleteArticle: async function (ctx, next) {
    try {
      let id = ctx.params.id
      await articleModel.deleteOne({_id: id})
      ctx.body = {
        success: true,
        msg:'删除成功！'
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        success: false,
        msg: '删除失败'
      }
    }
  },


}