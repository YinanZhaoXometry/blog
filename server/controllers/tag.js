const tagModel = require('../models/tag')
const articleModel = require('../models/article')

module.exports = {
  // 获取所有标签
  async getTags (ctx, next) {
    let totalTagList = await tagModel.find({}, {})
    ctx.body = {totalTagList}
  },


  // 获取xx标签下的所有文章
  async getTagArticles (ctx, next) {
    let tagId = ctx.params.id
    let tagInfo = await tagModel.findOne({_id:tagId}, {})
    let articleList = await articleModel.find({tags:tagId}, '-content -comments', {sort: {createTime: -1}})
    ctx.body = {
      articleList,
      tagInfo
    }
  },

  // 添加新分类
  async saveTags (ctx, next) {
    let {newTagNameList} = ctx.request.body
    let newDocs = newTagNameList.map(item => { return {name: item} })
    await tagModel.create(newDocs)
    ctx.status = 200
  },


}  
  