const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  webName: { type: String },
  mobileName: { type: String },
  imgCategory: { type: ObjectId, ref: 'imgCategoryModel' },
})

imageModel = mongoose.model('imageModel', imageSchema, 'images')

module.exports = imageModel