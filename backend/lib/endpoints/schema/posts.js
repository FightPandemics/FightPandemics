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
    .prop("type", S.array().maxItems(10).items(S.string()).required())
    .prop("shareWith", S.array().maxItems(10).items(S.string()))
    .prop("needs", S.array().maxItems(10).items(S.string()).required())
    .prop("tags", S.array().items(S.string()).required())
    .prop("language", S.string().required())
    .prop("website", S.string())
    .prop("iosUrl", S.string())
    .prop("androidUrl", S.string())
    .prop("media", S.string()),
};

const getPostByIdSchema = {
  querystring: S.object()
    .prop("authorId", S.string())
    .prop("skip", S.integer())
    .prop("limit", S.integer()),
};

const updatePostSchema = {
  body: S.object()
    .prop("title", S.string())
    .prop("description", S.string())
    .prop("type", S.array().maxItems(10).items(S.string()))
    .prop("shareWith", S.array().maxItems(10).items(S.string()))
    .prop("needs", S.array().maxItems(10).items(S.string()))
    .prop("tags", S.array().items(S.string()))
    .prop("language", S.string())
    .prop("website", S.string())
    .prop("iosUrl", S.string())
    .prop("androidUrl", S.string())
    .prop("media", S.string()),
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
