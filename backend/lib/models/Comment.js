const { model, Schema } = require("mongoose");

const CommentSchema = new Schema(
  {
    authorId: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
    comment: {
      required: true,
      type: String,
    },
    likes: {
      type: [Schema.Types.ObjectId],
    },
    likesCount: {
      type: Number,
    },
    parentId: {
      ref: "Comment",
      type: Schema.Types.ObjectId,
    },
    postId: {
      ref: "Post",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

CommentSchema.add({
  childCount: {
    type: Schema.Types.Number,
  },
  children: {
    ref: "Comment",
    type: [CommentSchema],
  },
});

CommentSchema.index({
  createdAt: 1,
  parentId: 1,
  postId: 1,
});

const Comment = model("Comment", CommentSchema);

function updateAuthorName(authorID, newAuthorName) {
  return Comment.where(
    { "author.authorId": authorID },
    { $set: { "author.authorName": newAuthorName } },
  );
}

function updateAuthorType(authorID, newAuthorType) {
  return Comment.where(
    { "author.authorId": authorID },
    { $set: { "author.authorType": newAuthorType } },
  );
}

module.exports = {
  model: Comment,
  schema: CommentSchema,
  updateAuthorName,
  updateAuthorType,
};
