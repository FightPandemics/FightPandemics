// -- Imports
const { Schema, model, ObjectId } = require("mongoose");
const { schema: locationSchema } = require("./Location");

const USER_TYPES = [
  "Company",
  "Community",
  "Government",
  "Health care provider",
  "Individual",
  "Non-profit",
  "Other",
  "Startup",
  "University",
];

// -- Schema
const authorSchema = new Schema({
  id: {
    ref: "User",
    required: true,
    type: ObjectId,
  },
  location: locationSchema,
  name: {
    required: true,
    type: String,
  },
  photo: String,
  type: {
    enum: USER_TYPES,
    required: true,
    trim: true,
    type: String,
  },
});

// -- Model
const Author = model("Author", authorSchema);

module.exports = {
  USER_TYPES,
  model: Author,
  schema: authorSchema,
};
