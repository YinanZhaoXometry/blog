const articleModel = require('../models/article')
const saveArticleToCategory = require('./category').saveArticleToCategory
const getTimeObj = require('../utils/getTimeObj')
const config = require('../config')

module.exports = {
  // 获取client文章列表
  async getArticles (ctx) {
    // 判断管理员是否登录，如已登陆则返回所有文章，否则仅返回公开文章
    condition =
      ctx.request.user ? {} : { isPublic: true, isPublished: true }
    let totalArticleCount = await articleModel.countDocuments(condition)
    let {pageNum, pageSize, isFromAdmin} = ctx.query
    pageNum = pageNum ? parseInt(pageNum) : 1
    pageSize = parseInt(pageSize)
    let getArticleList = articleModel.find(
      condition, '-content',
      {
        sort: {createTime: -1},
        skip: (pageNum - 1) * pageSize,
        limit: pageSize,
      }
    )
    // 判断是否是admin UI发来的请求，并作出响应
    let articleList =
    isFromAdmin
      ? await getArticleList.populate('category')
      : await getArticleList.populate('coverImage').populate('category')
    ctx.response.body = {
      articleList,
      totalArticleCount,
      imagePathPrefix: config.imagePathPrefix
    }
  },

  // 获取前台主页文章热门列表
  async getPopularArticles (ctx, next) {
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
  },

  // 获取前台单篇文章内容
  async getOneArticle (ctx, next) {
    let id = ctx.params.id
    let getOne = articleModel.findOne({_id: id}, null)
    let addViewsNumber = articleModel.updateOne({_id: id}, {$inc: {views: 1}})
    let [article] = await Promise.all([getOne.populate('category').populate('coverImage').populate('tags'), addViewsNumber])
    ctx.body = {
      article,
      imagePathPrefix: config.imagePathPrefix
    }
  },

  async getSearchArticles (ctx, next) {
    let {keyword} = ctx.request.query
    let regExp = new RegExp(keyword, 'i')
    let conditions = {
      $or: [
        {title: regExp},
        {content: regExp},
      ]
    }
    let options = {
      sort: {createTime: -1}
    }
    let articles = await articleModel
      .find(conditions, "-content", options)
      .populate('category')
      .populate('coverImage')
    ctx.body = {
      articles,
      imagePathPrefix: config.imagePathPrefix
    
    }
  },

  // 发布文章（保存至数据库）
  async saveArticle (ctx, next) {
    let dataObj = ctx.request.body
    let createTime = getTimeObj()
    dataObj.createTime = createTime
    
    let newDoc = new articleModel(dataObj)
    let savedDoc = await newDoc.save()
    let result = await saveArticleToCategory(savedDoc.category, savedDoc._id)
    if(!result.nModified) ctx.throw('文章类型未成功保存至数据库！')
    ctx.body = {
      message: savedDoc.isPublished ? '文章发表成功！' : '文章草稿保存成功！'
    }
  },

  // 修改文章方法
  async updateArticle (ctx, next) {
    let {id, rawContent, htmlContent, category, tags, isPublic} = ctx.request.body
    let getUpdateResult = articleModel.updateOne(
      {_id: id},
      { $set: { rawContent, htmlContent, category, tags, isPublic } }
    )
    let getSaveCateResult = saveArticleToCategory(category, id)
    let [updateResult, saveCateResult] = await Promise.all([getUpdateResult, getSaveCateResult])
    if(!updateResult.nModified) console.log('文章内容无修改')
    if(!saveCateResult.nModified) console.log('文章类型无修改')
    ctx.body = {
      message:'修改成功！'
    }
  },

  // 删除文章方法
  async deleteArticle (ctx, next) {
    let id = ctx.params.id
    await articleModel.deleteOne({_id: id})
    ctx.body = {
      message:'删除成功！'
    }
  },

  async likeArticle (ctx, next) {
    let {id} = ctx.params
    let result = await articleModel.updateOne({_id: id}, { $inc: {likes: 1} })
    if (result.nModified !== 0)
      ctx.response.body = {
        success: true,
      }
    else
      ctx.response.body = {
        success: false,
      }
  },

  async dislikeArticle (ctx, next) {
    let {id} = ctx.params
    let result = await articleModel.updateOne({_id: id}, { $inc: {likes: -1} })
    if (result.nModified !== 0)
      ctx.response.body = { success: true }
    else
      ctx.response.body = { success: false }
  },

  // 定义方法，在对应的“article”的document中加入相关“comment”的_id
  saveCommentToArticle (articleId, commentId) {
    let queryObj = articleModel.updateOne({_id: articleId}, { $push: {comments: commentId} })
    return queryObj
  }

}