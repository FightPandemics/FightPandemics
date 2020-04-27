const S = require("fluent-schema");

const getPostsSchema = {
  querystring: S.object()
    .prop("authorId", S.string())
    .prop("skip", S.integer())
    .prop("limit", S.integer()),
};

const createPostSchema = {
  body: S.object()
    .prop("title", S.string().required())
    .prop("description", S.string().required())
    .prop("helpType", S.string())
    .prop("needs", S.array().maxItems(10).items(S.string()).required()),
};

const getPostByIdSchema = {
  querystring: S.object()
    .prop("authorId", S.string())
    .prop("skip", S.integer())
    .prop("limit", S.integer()),
};

const getPostByFiltersSchema = {
  querystring: S.object()
    .prop("helpType", S.string())
    .prop("needs", S.array().maxItems(12).items(S.string()).required()),
};

const updatePostSchema = {
  body: S.object()
    .prop("title", S.string().required())
    .prop("description", S.string().required())
    .prop("helpType", S.string())
    .prop("needs", S.array().maxItems(10).items(S.string()).required()),
  params: S.object().prop("postId", S.string().required()),
};

const likeUnlikePostSchema = {
  params: S.object().prop("postId", S.string().required()),
};

const likeUnlikeCommentSchema = {
  params: S.object()
    .prop("postId", S.string().required())
    .prop("commentId", S.string().required())
    .prop("userId", S.string().required()),
};

const deletePostSchema = {
  params: S.object().prop("postId", S.string().required()),
};

const addCommentSchema = {
  body: S.object().prop("comment", S.string().required()),
  params: S.object().prop("postId", S.string().required()),
};

const deleteCommentSchema = {
  params: S.object()
    .prop("commentId", S.string().required())
    .prop("postId", S.string().required()),
};

const updateCommentSchema = {
  body: S.object().prop("comment", S.string().required()),
  params: S.object()
    .prop("commentId", S.string().required())
    .prop("postId", S.string().required()),
};

module.exports = {
  addCommentSchema,
  createPostSchema,
  deleteCommentSchema,
  deletePostSchema,
  getPostByIdSchema,
  getPostsSchema,
  likeUnlikeCommentSchema,
  likeUnlikePostSchema,
  updateCommentSchema,
  updatePostSchema,
};
