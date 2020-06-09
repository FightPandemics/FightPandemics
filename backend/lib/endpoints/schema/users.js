const S = require("fluent-schema");
const { strictSchema } = require("./utils");
const { locationSchema } = require("./location");

const needsSchema = S.object()
  .prop("medicalHelp", S.boolean().required().default(false))
  .prop("otherHelp", S.boolean().required().default(false));

const objectivesSchema = S.object()
  .prop("donate", S.boolean().required().default(false))
  .prop("shareInformation", S.boolean().required().default(false))
  .prop("volunteer", S.boolean().required().default(false));

const urlsSchema = S.object()
  .prop("facebook", S.string().format("url"))
  .prop("github", S.string().format("url"))
  .prop("linkedin", S.string().format("url"))
  .prop("twitter", S.string().format("url"))
  .prop("website", S.string().format("url"));

const createUserSchema = {
  body: strictSchema()
    .prop("firstName", S.string().required())
    .prop("lastName", S.string().required())
    .prop("needs", needsSchema)
    .prop("objectives", objectivesSchema)
    .prop("url", urlsSchema)
    .prop("location", locationSchema),
};

const getUserByIdSchema = {
  params: strictSchema().prop("userId", S.string().required()),
};

const updateUserSchema = {
  body: strictSchema()
    .prop("about", S.string())
    .prop("firstName", S.string())
    .prop("lastName", S.string())
    .prop("needs", needsSchema)
    .prop("objectives", objectivesSchema)
    .prop("url", urlsSchema)
    .prop("location", locationSchema),
};

module.exports = {
  createUserSchema,
  getUserByIdSchema,
  updateUserSchema,
};
