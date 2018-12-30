const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  name: {type: String, requried: true},
  password: {type: String, required: true}
})

userModel = mongoose.model('userModel', userSchema, 'users')

module.exports = userModel