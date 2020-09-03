// -- Imports
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
      // TODO: how to guarantee unique ids?
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

// -- Indexes
// Indexes for filtered feed
/* eslint-disable sort-keys */
postSchema.index({ "author.location.coordinates": "2dsphere" });
postSchema.index({
  // Expiration Filter
  expireAt: -1,
  // Location filter
  "location.country": 1,
  "location.state": 1,
  "location.city": 1,
  "location.neighborhood": 1,
  // Author type filter
  "author.type": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Distance sorting
  "author.location.coordinates": "2dsphere",
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
  "author.type": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Distance sorting
  "author.location.coordinates": "2dsphere",
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
  "author.type": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Distance sorting
  "author.location.coordinates": "2dsphere",
  // Simple most recent sorting
  createdAt: -1,
});
postSchema.index({
  // Expiration Filter
  expireAt: -1,
  // Location filter
  "location.country": 1,
  // Author type filter
  "author.type": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Distance sorting
  "author.location.coordinates": "2dsphere",
  // Simple most recent sorting
  createdAt: -1,
});
postSchema.index({
  // Expiration Filter
  expireAt: -1,
  // No Location filter
  // Author type filter
  "author.type": 1,
  // Post type filter
  types: 1,
  // Objective filter
  objective: 1,
  // Distance sorting
  "author.location.coordinates": "2dsphere",
  // Simple most recent sorting
  createdAt: -1,
});

// Index for author's foreign key for lookup performance
postSchema.index({ "author.id": 1, createdAt: -1 });

// Index for like's foreign key for lookup performance
postSchema.index({ likes: 1 });
/* eslint-enable */

// index title and content for search
postSchema.index(
  {
    content: "text",
    title: "text",
  },
  {
    language_override: "dummy",
  },
);

// -- Model
const Post = model("Post", postSchema);

module.exports = {
  EXPIRATION_OPTIONS,
  POST_OBJECTIVES,
  POST_TYPES,
  VISIBILITY_OPTIONS,
  model: Post,
  schema: postSchema,
};
