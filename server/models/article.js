const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// 定义models Schema
const articleSchema = new mongoose.Schema({
  title: String,       // 文章标题
  author: {            // 作者姓名、个人站点
    name: { type: String, required: true },
    site: { type: String, default: 'http://zhaoyn.info' }
  },     
  createTime: {},     // 文章创建时间
  updateTime: {},     // 文章最后编辑时间
  absctract: String,  // 文章简介
  content: String,   // 文章内容
  category: { type: ObjectId, ref: 'categoryModel' },  // 文章分类
  tags: [], // 标签
  comments: [{ type: ObjectId, ref: 'commentModel' }],   // 评论
  titleImgUrl: String,   // 题图URL
  isPublic: Boolean,   // 是否公开
  isPublished: Boolean,  // 是否发表
  isOriginal: Boolean,   // 是否原创
  views: { type: Number, default: 0 },  // 浏览数
  likes: { type: Number, default: 0 }  // 点赞数
  // htmlContent: String,
  // rawContent: String,

})

const articleModel = mongoose.model('articleModel', articleSchema, 'articles')

module.exports = articleModel
