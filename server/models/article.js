const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// 定义models Schema
const articleSchema = new mongoose.Schema({
  title: String,       // 文章标题
  author: { type: String, required: true },   // 作者
  createTime: {},     // 文章创建时间
  updateTime: {},     // 文章最后编辑时间
  description: { type: String, required: true },  // 文章简介
  htmlContent: { type: String, required: true },   // html格式文章内容
  rawContent: { type: String, required: true },    // 原始格式文章内容
  category: { type: ObjectId, ref: 'categoryModel' },  // 文章分类
  tags: [], // 标签
  comments: [{ type: ObjectId, ref: 'commentModel' }],   // 评论
  coverImage: { type: ObjectId, ref: 'imageModel' },   // 封面图片
  isPublic: { type: Boolean, default: true },     // 是否公开
  isPublished: { type: Boolean },  // 是否发表
  isOriginal: { type: Boolean, default: true },   // 是否原创
  views: { type: Number, default: 0 },  // 浏览数
  likes: { type: Number, default: 0 }  // 点赞数
  // htmlContent: String,
  // rawContent: String,

})

const articleModel = mongoose.model('articleModel', articleSchema, 'articles')

module.exports = articleModel
