const commentModel = require('../models/comment')
const saveCommentToArticle = require('./article').saveCommentToArticle
const getTimeObj = require('../utils/getTimeObj')
const marked = require('marked')
const sanitizeHtml = require('sanitize-html')

module.exports = {
  // 获取评论处理函数
  async getComments (ctx, next) {
    let condition = ctx.params
    let option = { sort: {createTime: -1} }
    let comments = await commentModel.find(condition, {}, option)
    ctx.response.body = {
      comments
    }
  },

  // 保存评论处理函数
  async saveComment (ctx, next) {
    let ip = (  // 确定用户ip
      ctx.request.ip ||
      ctx.request.ips[0] ||
      ctx.request.socket.remoteAddress ||
      ctx.request.headers['x-real-ip'] ||
      ctx.request.headers['x-forwarded-for'] 
    ).replace('::ffff:', '')
    let { content, articleId, fromWhom } = ctx.request.body
    content = marked(content)        // 将markdown内容解析为html
    content = sanitizeHtml(content, {  // 过滤掉恶意的html，防止XXS攻击
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
    })  
    if(!content.trim()) ctx.throw(400, '非法的评论内容')
    let createTime = getTimeObj() 
    // 将评论保存至数据库
    let newDoc = new commentModel({
      createTime,
      ip,
      articleId,
      content,
      fromWhom
    })
    let savedDoc = await newDoc.save()
    // 将评论的_id保存至文章的collection中
    let result = await saveCommentToArticle(articleId, savedDoc._id)
    if(!result.nModified) ctx.throw('文章类型未成功保存至数据库！')
    ctx.response.body = { message: '回复成功' }
  },

  // 保存子评论处理函数（在评论document中增加子评论字段）
  async saveChildComment (ctx, next) {
    let { _id, isReplyToParent, content, fromWhom, toWhom } = ctx.request.body
    content = marked(content)    // 将markdown内容解析为html
    content = sanitizeHtml(content, {   // 过滤掉恶意的html，防止XXS攻击
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
    })     
    if(!content.trim()) ctx.throw(400, '非法的评论内容')

    let createTime = getTimeObj()
    let subComment = {
      isReplyToParent,
      createTime,
      content,
      fromWhom,
      toWhom 
    }
    let commentDoc = await commentModel.findOne({_id})
    commentDoc.subComments.push(subComment)
    await commentDoc.save()
    ctx.response.body = {
      message: '回复成功'
    }
  },

  async likeComment (ctx, next) {
    let {id} = ctx.params
    let result = await commentModel.updateOne({_id: id}, { $inc: {likes: 1} })
    if (result.nModified !== 0) 
      ctx.response.body = {
        success: true,
      }
    else
      ctx.response.body = {
        success: false,
      }
  },
  
  async dislikeComment (ctx, next) {
    let {id} = ctx.params
    let result = await commentModel.updateOne({_id: id}, { $inc: {likes: -1} })
    if (result.nModified !== 0) 
      ctx.response.body = {
        success: true,
      }
    else
      ctx.response.body = {
        success: false,
      }
    }
}