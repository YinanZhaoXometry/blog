const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// 定义models Schema
const articleSchema = new mongoose.Schema({
  title: String,
  // author: String,
  absctract: String,
  content: String,
  // htmlContent: String,
  // rawContent: String,
  category: {
    type: ObjectId,
    ref: 'categoryModel'
  },
  comments: Array,
  pictureUrl: String,
  time: {},
  tags: [],
  pv: Number,
  // likes: Number
})

const articleModel = mongoose.model('articleModel', articleSchema, 'articles')

module.exports = articleModel
