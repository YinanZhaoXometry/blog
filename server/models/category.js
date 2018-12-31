const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const categorySchema = new mongoose.Schema({
  nameCN: String,
  nameEN: String,
  description: String,
  articles: [{
    type: ObjectId,
    ref: 'articleModel'
  }]
})

const categoryModel = mongoose.model('categoryModel', categorySchema, 'categories')

module.exports = categoryModel