// -- Imports
const mongoose = require("mongoose");
const { Schema, model, ObjectId } = require("mongoose");

const EXPIRATION_OPTIONS = ["day", "week", "month", "forever"];
const VISIBILITY_OPTIONS = ["city", "country", "state", "worldwide"];
const POST_OBJECTIVES = ["request", "offer"];
const POST_TYPES = [
  "Business",
  "Education",
  "Entertainment",
  "Funding",
  "Groceries/Food",
  "Information",
  "Legal",
  "Medical Supplies",
  "R&D",
  "Others",
  "Wellbeing/Mental",
  "Tech",
];

// -- Schema
const postSchema = new Schema(
  {
    airtableId: String,
    author: Object,
    content: {
      required: true,
      trim: true,
      type: String,
    },
    expireAt: Date,
    externalLinks: {
      appStore: { trim: true, type: String },
      email: { trim: true, type: String },
      playStore: { trim: true, type: String },
      website: { trim: true, type: String },
    },
    language: [String],
    likes: {
      default: [],
      ref: "User",
      type: [ObjectId],
    },
    objective: {
      enum: POST_OBJECTIVES,
      lowercase: true,
      required: true,
      trim: true,
      type: String,
    },
    title: {
      required: true,
      trim: true,
      type: String,
    },
    types: {
      enum: POST_TYPES,
      trim: true,
      type: [String],
    },
    visibility: {
      enum: VISIBILITY_OPTIONS,
      lowercase: true,
      trim: true,
      type: String,
    },
  },
  { collection: "posts", timestamps: true },
);

module.exports = mongoose.model("post", postSchema);
