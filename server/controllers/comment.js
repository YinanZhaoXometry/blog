const commentModel = require('../models/comment')
const getTimeObj = require('../utils/getTimeObj')

module.exports = {
  // 获取评论处理函数
  async getComments (ctx, next) {
    try {
      let condition = ctx.params
      console.log(condition)
      let option = { sort: {createTime: -1} }
      let comments = await commentModel.find(condition, {}, option)
      ctx.response.body = {
        success: true,
        comments
      }
    } catch (err) {
      console.log('发现错误：', err)
      ctx.response.body = {
        success: false,
        err
      }
    }
  },

  // 保存评论处理函数
  async saveComment (ctx, next) {
    try {
      let ip = (  // 确定用户ip
        ctx.request.ip ||
        ctx.request.ips[0] ||
        ctx.request.socket.remoteAddress ||
        ctx.request.headers['x-real-ip'] ||
        ctx.request.headers['x-forwarded-for'] 
      ).replace('::ffff:', '')
      let { content, articleId, fromWhom } = ctx.request.body
      let time = getTimeObj()
      let newDoc = new commentModel({
        createTime: time,
        ip,
        articleId,
        content,
        fromWhom
      })
      await newDoc.save()
      ctx.response.body = {
        success: true,
        message: '回复成功'
      }
    } catch (err) {
      console.log('发现错误：',err)
      ctx.response.body = {
        success: false,
        message: '回复失败',
      }
    }
  },

  // 保存子评论处理函数（在评论document中增加子评论字段）
  async updateComment (ctx, next) {
    try {
      let { _id, isReplyToParent, content, fromWhom, toWhom } = ctx.request.body
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
        success: true,
        message: '回复成功'
      }
    } catch (err) {
      console.log('发现错误', err)
      ctx.response.body = {
        success: false,
        message: '回复失败'
      }
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