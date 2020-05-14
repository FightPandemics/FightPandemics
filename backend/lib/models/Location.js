const { Schema, model } = require("mongoose");

const LocationSchema = new Schema({});

module.exports = model("Location", LocationSchema);
