const articleModel = require('../models/article')
const categoryController = require('./category')
const getTimeObj = require('../utils/getTimeObj')

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
          sort: {createTime: -1}, 
          skip: (pageNum - 1) * pageSize,
          limit: pageSize,
        }
      )
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
          sort: {views: -1}, 
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
      let id = ctx.params.id
      let getOne = articleModel.findOne({_id: id}, null)
      let addViewsNumber = articleModel.updateOne({_id: id}, {$inc: {views: 1}})
      let [article] = await Promise.all([getOne, addViewsNumber])
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
      let {title, author, tags, category, isOriginal, isPublic, content, abstract,isPublished} = ctx.request.body
      let newDoc = new articleModel({
        title,
        author,
        content,
        abstract,
        time,
        tags,
        category,
        isPublic,
        isOriginal,
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