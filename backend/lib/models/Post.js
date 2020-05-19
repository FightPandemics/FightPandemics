// -- Imports
const { Schema, model, ObjectId } = require("mongoose");

// -- Schema
const postSchema = new Schema(
  {
    author: Object,
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
      enum: [
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
      ],
      trim: true,
      type: [String],
    },
    visibility: {
      enum: ["city", "country", "state", "worldwide"],
      lowercase: true,
      trim: true,
      type: String,
    },
  },
  { collection: "posts", timestamps: true },
);

// -- Indexes
// Indexes for filtered feed
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

// -- Model
const Post = model("Post", postSchema);

function updateAuthorName(authorID, newAuthorName) {
  return Post.where(
    { "author.authorId": authorID },
    { $set: { "author.authorName": newAuthorName } },
  );
}

function updateAuthorType(authorID, newAuthorType) {
  return Post.where(
    { "author.authorId": authorID },
    { $set: { "author.authorType": newAuthorType } },
  );
}

module.exports = {
  model: Post,
  schema: postSchema,
  updateAuthorName,
  updateAuthorType,
};
