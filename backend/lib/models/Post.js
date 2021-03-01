// -- Imports
const { Schema, model, ObjectId } = require("mongoose");

const EXPIRATION_OPTIONS = ["day", "week", "month", "forever"];
const VISIBILITY_OPTIONS = ["city", "country", "state", "worldwide"];
const POST_OBJECTIVES = ["request", "offer"];
const SORT_OPTIONS = ["likes", "updatedAt", "views", "shares"];
const ORDER_OPTIONS = ["asc", "desc"]
const POST_TYPES = [
  "Business",
  "Education",
  "Entertainment",
  "Funding",
  "Groceries/Food",
  "Housing",
  "Information",
  "Legal",
  "Medical Supplies",
  "R&D",
  "Others",
  "Wellbeing/Mental",
  "Tech",
  "Childcare",
  "Translations",
  "Volunteer",
  "Staff (paid)",
  "Remote Work",
];
const POST_STATUS = ["public", "flagged", "removed"];
const reportSchema = new Schema(
  {
    id: {
      ref: "User",
      required: true,
      type: ObjectId,
    },
    reason: {
      required: true,
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { _id: false },
);

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
    isEdited: { default: false, type: Boolean },
    language: [String],
    likes: {
      // TODO: how to guarantee unique ids?
      default: [],
      ref: "User",
      type: [ObjectId],
    },
    views: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    objective: {
      enum: POST_OBJECTIVES,
      lowercase: true,
      required: true,
      trim: true,
      type: String,
    },
    reportedBy: {
      default: [],
      type: [reportSchema],
    },
    status: {
      required: true,
      type: String,
      enum: POST_STATUS,
      default: "public",
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
    "author.name": "text",
    content: "text",
    title: "text",
    types: "text",
    "author.location.country": "text",
    "author.location.state": "text",
    "author.location.city": "text",
  },
  {
    language_override: "dummy",
    weights: {
      "author.name": 1,
      content: 3,
      title: 5,
      types: 2,
      "author.location.country": 1,
      "author.location.state": 1,
      "author.location.city": 1,
    },
  },
);
// report status index
postSchema.index({ status: 1 });

// reportedBy user id index
postSchema.index({ "reportedBy.id": 1 });

// -- Model
const Post = model("Post", postSchema);

module.exports = {
  EXPIRATION_OPTIONS,
  POST_OBJECTIVES,
  SORT_OPTIONS,
  ORDER_OPTIONS,
  POST_TYPES,
  VISIBILITY_OPTIONS,
  POST_STATUS,
  model: Post,
  schema: postSchema,
};
