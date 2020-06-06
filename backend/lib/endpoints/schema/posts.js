const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const { schema: authorSchema } = require("../../models/Author");
const { schema: postSchema } = require("../../models/Post");

const EXPIRATION_OPTIONS = ["day", "week", "month", "forever"];
const POST_OBJECTIVES = postSchema.tree.objective.enum;
const POST_TYPES = postSchema.tree.types.enum;
const USER_TYPES = authorSchema.tree.type.enum;
const VISIBILITY_OPTIONS = postSchema.tree.visibility.enum;

const getPostsSchema = {
  querystring: strictSchema()
    .prop(
      "filter",
      strictSchema()
        .prop(
          "author.location.coordinates",
          S.array().items(S.number()).minItems(2).maxItems(2),
        )
        .prop("author.type", S.string().enum(USER_TYPES))
        .prop("types", S.array().items(S.string().enum(POST_TYPES)))
        .prop("objective", S.string().enum(POST_OBJECTIVES)),
    )
    .prop("limit", S.integer())
    .prop("skip", S.integer()),
};

const createPostSchema = {
  body: strictSchema()
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
    .prop("postId", S.string().required())
    .prop("userId", S.string().required()),
};

const likeUnlikeCommentSchema = {
  params: strictSchema()
    .prop("postId", S.string().required())
    .prop("commentId", S.string().required())
    .prop("userId", S.string().required()),
};

const deletePostSchema = {
  params: strictSchema().prop("postId", S.string().required()),
};

const createCommentSchema = {
  body: strictSchema()
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
