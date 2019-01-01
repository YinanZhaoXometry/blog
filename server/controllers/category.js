const categoryModel = require('../models/category')

module.exports = {

  // 获取所有分类方法
  getCategories: async function (ctx, next) {
    try {
      let result = await categoryModel.find({}, {})
      ctx.body = {
        result
      }
    } catch (err) {
      console.log(err)
    }
  },

  // 获取xx分类下的所有文章
  getCateArticles: async function(ctx, next) {
    try {
      let categoryName = ctx.params.category
      let {pageNum, pageSize} = ctx.query
      pageNum = pageNum ? parseInt(pageNum) : 1
      pageSize = parseInt(pageSize)
      // 获取xx分类下的文章总数量
      let result = await categoryModel.findOne({nameEN:categoryName},{})
      let cateArticleCount = result.articles.length
      // 获取分类对象，其中包含当前分类下的所有文章
      let categoryObj = await categoryModel
        .findOne({nameEN:categoryName},{})
        .populate({
          path: 'articles',
          options: {
            sort: {time: -1}, 
            skip: (pageNum -1) * pageSize,
            limit: pageSize,
          }
        })
      ctx.body = {
        success: true,
        categoryObj,
        cateArticleCount
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        success: false
      }
    }
  },

  // 添加新分类
  saveCategory: async function (ctx, next) {
    try {
      let data = ctx.request.body
      let newDoc = new categoryModel({
        name: data.name,
        description: data.description,
        articles: []
      })
      await newDoc.save()
      ctx.body = {
        success: true,
        message: '成功添加文章分类！'
      }
    } catch (err) {
      ctx.body = {
        success: false,
        message: '添加分类失败'
      }
    }
  },

  // 定义方法，用于将文章ID保存至分类表
  saveToCategory: function (categoryId, articleId) {
    let queryObj = categoryModel.updateOne({_id: categoryId}, { $push: {articles: articleId} })
    return queryObj
  }
}  
  