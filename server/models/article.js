const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// 定义models Schema
const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  time: {},
  absctract: String,
  content: String,
  // htmlContent: String,
  // rawContent: String,
  category: {
    type: ObjectId,
    ref: 'categoryModel'
  },
  tags: [],
  comments: Array,
  pictureUrl: String,
  isPublic: Boolean,
  isPublished: Boolean,
  isOriginal: Boolean,
  pv: Number,
  likes: Number,

})

const articleModel = mongoose.model('articleModel', articleSchema, 'articles')

module.exports = articleModel
