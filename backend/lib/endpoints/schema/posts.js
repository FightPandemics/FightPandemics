const S = require("fluent-schema");

const EXPIRATION_OPTIONS = ["day", "week", "month", "forever"];
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
];
const VISIBILITY_OPTIONS = ["city", "state", "country", "worldwide"];

const getPostsSchema = {
  querystring: S.object()
    .prop("authorId", S.string())
    .prop("skip", S.integer())
    .prop("limit", S.integer()),
};

const createPostSchema = {
  body: S.object()
    .prop("appStore", S.string().format("url"))
    .prop("content", S.string().required())
    .prop("email", S.string().format("email"))
    .prop("expiration", S.string().enum(EXPIRATION_OPTIONS).required())
    .prop("language", S.array().items(S.string()))
    .prop("objective", S.string().enum(POST_OBJECTIVES).required())
    .prop("playStore", S.string().format("url"))
    .prop("title", S.string().required())
    .prop(
      "types",
      S.array().minItems(1).items(S.string().enum(POST_TYPES)).required(),
    )
    .prop("visibility", S.string().enum(VISIBILITY_OPTIONS).required())
    .prop("website", S.string().format("url")),
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
