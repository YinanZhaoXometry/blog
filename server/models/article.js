const mongoose = require('mongoose')

// 定义models Schema
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // name: String,
  absctract: String,
  // htmlContent: String,
  // rawContent: String,
  topics: Array,
  pv: Number,
  // likes: Number
  title: String,
  content: String,
  comments: Array,
  pictureUrl: String,
  time: {}
})

const articleModel = mongoose.model('articleModel', articleSchema, 'articles')

module.exports = articleModel
