// -- Imports
const { Schema, model, ObjectId } = require("mongoose");
const { schema: authorSchema } = require("./author");

// -- Schema
const postSchema = new Schema(
  {
    author: authorSchema,
    content: {
      required: true,
      trim: true,
      type: String,
    },
    expireAt: Date,
    externalLinks: {
      appStore: String,
      email: String,
      playStore: String,
      website: String,
    },
    language: [String],
    likes: {
      // TODO: how to guarantee unique ids?
      default: [],
      ref: "User",
      type: [ObjectId],
    },
    objective: {
      enum: ["request", "offer"],
      lowercase: true,
      trim: true,
      type: String,
    },
    title: {
      required: true,
      trim: true,
      type: String,
    },
    types: {
      enum: [
        "business",
        "education",
        "entertainment",
        "funding",
        "groceries/food",
        "information",
        "legal",
        "medical supplies",
        "r&d",
        "others",
        "wellbeing/mental",
      ],
      lowercase: true,
      trim: true,
      type: [String],
    },
    visibility: {
      enum: ["country", "state", "worldwide", "zipcode"],
      lowercase: true,
      trim: true,
      type: String,
    },
  },
  { collection: "posts", timestamps: true },
);

// -- Indexes
/* eslint-disable */
// Indexes for filtered feed
postSchema.index({
  // Expiration Filter
  expireAt: -1,
  // Location filter
  "location.country": 1,
  "location.state": 1,
  "location.city": 1,
  "location.neighborhood": 1,
  // Author type filter
  "author.authorType": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Simple most recent sorting
  createdAt: -1,
});
postSchema.index({
  // Expiration Filter
  expireAt: -1,
  // Location filter
  "location.country": 1,
  "location.state": 1,
  "location.city": 1,
  // Author type filter
  "author.authorType": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Simple most recent sorting
  createdAt: -1,
});
postSchema.index({
  // Expiration Filter
  expireAt: -1,
  // Location filter
  "location.country": 1,
  "location.state": 1,
  // Author type filter
  "author.authorType": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Simple most recent sorting
  createdAt: -1,
});
postSchema.index({
  // Expiration Filter
  expireAt: -1,
  // Location filter
  "location.country": 1,
  // Author type filter
  "author.authorType": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Simple most recent sorting
  createdAt: -1,
});
postSchema.index({
  // Expiration Filter
  expireAt: -1,
  // No Location filter
  // Author type filter
  "author.authorType": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Simple most recent sorting
  createdAt: -1,
});

// Index for author's foreign key for lookup performance
postSchema.index({ "author.authorId": 1, createdAt: -1 });

// Index for like's foreign key for lookup performance
postSchema.index({ likes: 1 });
/* eslint-enable */

// -- Model
const Post = model("Post", postSchema);

exports.schema = postSchema;
exports.model = Post;
