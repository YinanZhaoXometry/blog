const commentModel = require('../models/comment')
const getTimeObj = require('../utils/getTimeObj')

module.exports = {
  saveComment: async function (ctx, next) {
    try {
      const ip = (
        ctx.request.ip ||
        ctx.request.ips[0] ||
        ctx.request.socket.remoteAddress ||
        ctx.request.headers['x-real-ip'] ||
        ctx.request.headers['x-forwarded-for'] 
      ).replace('::ffff:', '')
      let {content, name, email, site, articleId} = ctx.request.body
      let time = getTimeObj()
      let newDoc = new commentModel({
        ip,
        articleId,
        content,
        createTime: time,
        fromWhom: { name, email, site }
      })
      let commentDoc = await newDoc.save()
      console.log(commentDoc)
    } catch (err) {
      console.log(err)
    }
    
  }
}