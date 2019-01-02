const articleModel = require('../models/article')
const categoryController = require('./category')

// 定义工具函数返回time对象，储存不同时间格式，方便后续使用（精确到毫秒、年、月、日、分钟）
function getTimeObj () {
  let newDate = new Date()
  let ms = newDate.getTime()
  let year = newDate.getFullYear()
  let month = newDate.getMonth()+1
  let date = newDate.getDate()
  let hours = newDate.getHours()
  let minutes = newDate.getMinutes()
  let fullDate = year + "年" + month + "月" + date + "日"  
  let simpleDate = month + "月" + date + "日" 
  let hoursMinutes = ( hours < 10 ? ('0' + hours) : hours )   
    + ":" + ( minutes < 10 ? ('0' + minutes) : minutes )
  if (hours >= 0 && hours < 5) {
    hoursMinutes = '凌晨' + hoursMinutes
  } else if (hours >= 5 && hours < 12) {
    hoursMinutes = '早上' + hoursMinutes
  } else if (hours >= 12 && hours < 13) {
    hoursMinutes = '中午' + hoursMinutes
  } else if (hours >= 13 && hours < 18) {
    hoursMinutes = '下午' + hoursMinutes
  } else {
    hoursMinutes = '晚上' + hoursMinutes
  }
  let time = {
    ms,           // 1546416960905
    year,         // 2018
    month,        // 12
    fullDate,     // 2018年12月5日
    simpleDate,   // 12月5日
    hoursMinutes, // 上午06:52
  }
  return time
}

module.exports = {
  // 获取client文章列表
  getArticles: async (ctx, next) => {
    try {
      // 判断管理员是否登录，如已登陆则返回所有文章，否则仅返回公开文章
      condition = 
        ctx.session.user 
        ? {} 
        : condition = {
          isPublic: true,
          isPublished: true,
        }
      let {pageNum, pageSize} = ctx.query
      pageNum = pageNum ? parseInt(pageNum) : 1
      pageSize = parseInt(pageSize)
      let totalArticleCount = await articleModel.countDocuments(condition)
      let articleList = await articleModel.find(
        condition, {}, 
        {
          sort: {time: -1}, 
          skip: (pageNum - 1) * pageSize,
          limit: pageSize,
        }
      )
      console.log(totalArticleCount)
      ctx.body = {
        success: true,
        articleList, 
        totalArticleCount 
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        success: false,
      }
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
      let time = getTimeObj()
      console.log(ctx.request.body)
      let {title, author, tags, category, isOriginal, isPublic, content, abstract,isPublished} = ctx.request.body
      let newDoc = new articleModel({
        title,
        author,
        content,
        abstract,
        time,
        tags,
        category,
        isOriginal,
        isPublic,
        isPublished
      })
      let articleDoc = await newDoc.save()
      let result = await categoryController.saveToCategory(articleDoc.category, articleDoc._id)
      if(!result.nModified)
        throw new Error('文章类型未成功保存至数据库！')
      ctx.body = {
        success: true,
        message: articleDoc.isPublished ? '文章发表成功！' : '文章草稿保存成功！'
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