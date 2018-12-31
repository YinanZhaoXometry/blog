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
    let result = categoryModel.updateOne({_id: categoryId}, { $push: {articles: articleId} })
    return result
  }
}  
  