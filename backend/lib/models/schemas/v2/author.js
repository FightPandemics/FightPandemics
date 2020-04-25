// -- Imports
const { Schema, model, ObjectId } = require("mongoose");
const { schema: locationSchema } = require("./location");

// -- Schema
const authorSchema = new Schema({
  authorId: {
    ref: "User",
    required: true,
    type: ObjectId,
  },
  authorName: {
    required: true,
    type: String,
  },
  authorType: {
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
  location: locationSchema,
});

// -- Model
const Author = model("Author", authorSchema);

exports.schema = authorSchema;
exports.model = Author;
