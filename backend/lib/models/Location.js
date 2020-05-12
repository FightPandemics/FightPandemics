const { Schema, model } = require("mongoose");

const LocationSchema = new Schema({});

module.exports.LocationSchema = LocationSchema;
module.exports.LocationModel = model("Location", LocationSchema);
