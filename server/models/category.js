const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const categorySchema = new mongoose.Schema({
  cnName: { type: String, required: true },
  enName: { type: String, required: true },
  description: { type: String, required: true },
  articles: [{
    type: ObjectId,
    ref: 'articleModel'
  }]
})

const categoryModel = mongoose.model('categoryModel', categorySchema, 'categories')

module.exports = categoryModel