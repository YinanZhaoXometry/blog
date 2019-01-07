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
      let { content, articleId, fromWhom } = ctx.request.body
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
      let { _id, isReplyToParent, content, fromWhom, toWhom } = ctx.request.body
      let createTime = getTimeObj()
      let subComment = {
        isReplyToParent,
        createTime,
        content,
        fromWhom,
        toWhom 
      }
      console.log(subComment)
      // let options = {runValidators: true}
      // let updateResult = await commentModel.findByIdAndUpdate(
      //   { _id }, { $push: { subComments: subComment }, options }
      // )
      let newDoc = await commentModel.findOne({_id})
      let result1 = newDoc.subComments.push(subComment)
      console.log(111111, newDoc)
      let result = await newDoc.save()
      // console.log(result)
    } catch (err) {
      console.log('发现错误', err)
    }
  }
  
}