const { Schema, model } = require('mongoose')

// User Schema
const LocationSchema = new Schema({
  _id: Schema.Types.ObjectId,
})

module.exports = model("Location", LocationSchema)
