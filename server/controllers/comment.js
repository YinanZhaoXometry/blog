const commentModel = require('../models/comment')
const getTimeObj = require('../utils/getTimeObj')

module.exports = {
  // 保存评论处理函数
  saveComment: async function (ctx, next) {
    try {
      let ip = (  // 确定用户ip
        ctx.request.ip ||
        ctx.request.ips[0] ||
        ctx.request.socket.remoteAddress ||
        ctx.request.headers['x-real-ip'] ||
        ctx.request.headers['x-forwarded-for'] 
      ).replace('::ffff:', '')
      let { content, fromWhom, articleId } = ctx.request.body
      let time = getTimeObj()
      let newDoc = new commentModel({
        createTime: time,
        ip,
        articleId,
        content,
        fromWhom
      })
      let commentDoc = await newDoc.save()
      console.log(commentDoc)
    } catch (err) {
      console.log('发现错误：',err)
    }
  },

   // 保存子评论处理函数（在评论document中增加子评论字段）
   updateComment: async function (ctx, next) {
    try {
      let { _id, isReplyToMain, content, fromWhom, toWhom } = ctx.request.body
      let createTime = getTimeObj()
      let subComment = {
        isReplyToMain,
        createTime,
        content,
        fromWhom,
        toWhom 
      }
      let updateResult = await commentModel.updateOne(
        {_id:_id}, { $push: { subComments: subComment } }
      )
      console.log(updateResult)
    } catch (err) {
      console.log('发现错误', err)
    }
  }
  
}