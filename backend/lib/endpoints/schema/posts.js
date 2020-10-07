const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const {
  EXPIRATION_OPTIONS,
  POST_OBJECTIVES,
  POST_TYPES,
  VISIBILITY_OPTIONS,
} = require("../../models/Post");

const getPostsSchema = {
  querystring: strictSchema()
    .prop("authorId", S.string())
    .prop("filter", S.string()) // URI encoded JSON; TODO: figure out way to custom validation
    .prop("ignoreUserLocation", S.boolean().default(false))
    .prop("limit", S.integer())
    .prop("objective", S.string().enum(POST_OBJECTIVES))
    .prop("skip", S.integer())
    .prop("includeMeta", S.boolean().default(false)),
};

const createPostSchema = {
  body: strictSchema()
    .prop("authorId", S.string())
    .prop("content", S.string().required())
    .prop("expireAt", S.string().enum(EXPIRATION_OPTIONS).required())
    .prop(
      "externalLinks",
      S.object()
        .prop("appStore", S.string().format("url"))
        .prop("email", S.string().format("email"))
        .prop("playStore", S.string().format("url"))
        .prop("website", S.string().format("url")),
    )
    .prop("language", S.array().items(S.string()))
    .prop("objective", S.string().enum(POST_OBJECTIVES).required())
    .prop("title", S.string().required())
    .prop(
      "types",
      S.array().minItems(1).items(S.string().enum(POST_TYPES)).required(),
    )
    .prop("visibility", S.string().enum(VISIBILITY_OPTIONS).required()),
};

const getPostByIdSchema = {
  querystring: S.object().prop("skip", S.integer()).prop("limit", S.integer()),
};

const updatePostSchema = {
  body: strictSchema()
    .prop("content", S.string())
    .prop("expireAt", S.string().enum(EXPIRATION_OPTIONS))
    .prop(
      "externalLinks",
      S.object()
        .prop("appStore", S.string().format("url"))
        .prop("email", S.string().format("email"))
        .prop("playStore", S.string().format("url"))
        .prop("website", S.string().format("url")),
    )
    .prop("language", S.array().items(S.string()))
    .prop("objective", S.string().enum(POST_OBJECTIVES))
    .prop("title", S.string())
    .prop("types", S.array().minItems(1).items(S.string().enum(POST_TYPES)))
    .prop("visibility", S.string().enum(VISIBILITY_OPTIONS)),
  params: S.object().prop("postId", S.string()),
};

const likeUnlikePostSchema = {
  params: strictSchema()
    .prop("authorId", S.string().required())
    .prop("postId", S.string().required()),
};

const likeUnlikeCommentSchema = {
  params: strictSchema()
    .prop("authorId", S.string().required())
    .prop("postId", S.string().required())
    .prop("commentId", S.string().required()),
};

const deletePostSchema = {
  params: strictSchema().prop("postId", S.string().required()),
};

const createCommentSchema = {
  body: strictSchema()
    .prop("authorId", S.string())
    .prop("content", S.string().required())
    .prop("parentId", S.string()),
  params: strictSchema().prop("postId", S.string().required()),
};

const getCommentsSchema = {
  params: strictSchema().prop("postId", S.string().required()),
  queryString: strictSchema()
    .prop("limit", S.integer())
    .prop("skip", S.integer()),
};

const deleteCommentSchema = {
  params: strictSchema()
    .prop("commentId", S.string().required())
    .prop("postId", S.string().required()),
};

const updateCommentSchema = {
  body: strictSchema().prop("content", S.string().required()),
  params: strictSchema()
    .prop("commentId", S.string().required())
    .prop("postId", S.string().required()),
};

module.exports = {
  createCommentSchema,
  createPostSchema,
  deleteCommentSchema,
  deletePostSchema,
  getCommentsSchema,
  getPostByIdSchema,
  getPostsSchema,
  likeUnlikeCommentSchema,
  likeUnlikePostSchema,
  updateCommentSchema,
  updatePostSchema,
};
