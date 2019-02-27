const categoryModel = require('../models/category')
const config = require('../config')

module.exports = {
  // 获得所有分类
  async getCategories (ctx, next) {
    let result = await categoryModel.find({}, {})
    ctx.body = { result }
  },

  // 获取xx分类下的文章
  async getCateArticles (ctx, next) {
    let categoryName = ctx.params.category
    let { pageNum, pageSize } = ctx.query
    pageNum = pageNum ? parseInt(pageNum) : 1
    pageSize = parseInt(pageSize)
    // 获取xx分类下的文章总数量
    let result = await categoryModel.findOne({ enName: categoryName },{})
    if(result === null) {
      ctx.throw(400, '没有该分类')
    } else{
      let cateArticleCount = result.articles.length
      // 获取分类对象，其中包含当前分类下的所有文章
      let categoryObj = await categoryModel
        .findOne({ enName:categoryName },{})
        .populate({
          path: 'articles',
          options: {
            sort: { time: -1 }, 
            skip: (pageNum -1) * pageSize,
            limit: pageSize,
          },
          populate: { path: 'coverImage' }
        })
      ctx.body = {
        categoryObj,
        cateArticleCount,
        imagePathPrefix: config.imagePathPrefix
      }
    }
  },

  // 添加新分类
  async saveCategory (ctx, next) {
    let {cnName, enName, description} = ctx.request.body
    let newDoc = new categoryModel({
      cnName,
      enName,
      description,
      articles: []
    })
    await newDoc.save()
    ctx.body = { message: '成功添加文章分类！' }
  },

  // 定义方法，用于在”category“document中加入相关“article”的_id
  saveArticleToCategory (categoryId, articleId) {
    let queryObj = categoryModel.updateOne({_id: categoryId}, { $push: {articles: articleId} })
    return queryObj
  },

  async updateCategory (ctx, next) {
    let {_id} = ctx.params
    let {cnName, enName, description} = ctx.request.body
    let result = await categoryModel.updateOne(
      { _id }, 
      { $set: {cnName, enName, description} }
    )
    if (result.nModified !== 0) {
      ctx.body = { message: '修改成功' }
    }else{
      ctx.throw('304', '无变化')
    }
  },

  async deleteCategory (ctx, next) {
    let {_id} = ctx.params
    let result = await categoryModel.deleteOne({_id})
    if (result.n !== 0) ctx.status = 200
  }
}  
  