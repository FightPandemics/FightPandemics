const S = require("fluent-schema");
const { strictSchema } = require("./utils");
const { locationSchema } = require("./location");

const createUserSchema = {
  body: strictSchema()
    .prop("firstName", S.string().required())
    .prop("lastName", S.string().required())
    .prop(
      "needs",
      S.object()
        .prop("medicalHelp", S.boolean().required().default(false))
        .prop("otherHelp", S.boolean().required().default(false)),
    )
    .prop(
      "objectives",
      S.object()
        .prop("donate", S.boolean().required().default(false))
        .prop("shareInformation", S.boolean().required().default(false))
        .prop("volunteer", S.boolean().required().default(false)),
    )
    .prop(
      "url",
      S.object()
        .prop("facebook", S.string().format("url"))
        .prop("github", S.string().format("url"))
        .prop("linkedin", S.string().format("url"))
        .prop("twitter", S.string().format("url"))
        .prop("website", S.string().format("url")),
    )
    .prop("location", locationSchema),
};

const getUserByIdSchema = {
  params: strictSchema().prop("userId", S.string().required()),
};

module.exports = {
  createUserSchema,
  getUserByIdSchema,
};
