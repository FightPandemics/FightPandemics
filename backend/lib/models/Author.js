// -- Imports
const { Schema, model, ObjectId } = require("mongoose");
const { schema: locationSchema } = require("./Location");

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
    enum: [
      "Company",
      "Community",
      "Government",
      "Health care provider",
      "Individual",
      "Non-profit",
      "Other",
      "R&D",
      "Startup",
      "University",
    ],
    required: true,
    trim: true,
    type: String,
  },
});

// -- Model
const Author = model("Author", authorSchema);

exports.schema = authorSchema;
exports.model = Author;
