const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
})

const tagModel = mongoose.model('tagModel', tagSchema, 'tags')

module.exports = tagModel