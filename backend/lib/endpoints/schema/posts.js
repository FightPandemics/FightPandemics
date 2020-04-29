const S = require("fluent-schema");

const { join } = require("path");
const PATH_TO_SCHEMAS = join(__dirname, "../../models/schemas/v2");
const { schema: postSchema } = require(join(PATH_TO_SCHEMAS, "post"));
const { schema: orgSchema } = require(join(PATH_TO_SCHEMAS, "individualUser"));
const { schema: userSchema } = require(join(
  PATH_TO_SCHEMAS,
  "organizationUser",
));

const EXPIRATION_OPTIONS = ["day", "week", "month", "forever"];
const POST_OBJECTIVES = postSchema.tree.objective.enum;
const POST_TYPES = postSchema.tree.types.enum;
const USER_TYPES = [].concat(
  userSchema.tree.type.enum,
  orgSchema.tree.type.enum,
);
const VISIBILITY_OPTIONS = postSchema.tree.visibility.enum;

const getPostsSchema = {
  querystring: S.object()
    .prop("authorId", S.string())
    .prop(
      "filter",
      S.object()
        .prop(
          "author.location.coords",
          S.array().items(S.number()).minItems(2).maxItems(2),
        )
        .prop("author.userType", S.string().enum(USER_TYPES))
        .prop("types", S.array().items(S.string().enum(POST_TYPES)))
        .prop("objective", S.string().enum(POST_OBJECTIVES)),
    )
    .prop("limit", S.integer())
    .prop("skip", S.integer()),
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
  querystring: S.object().prop("skip", S.integer()).prop("limit", S.integer()),
};

const updatePostSchema = {
  body: S.object()
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
