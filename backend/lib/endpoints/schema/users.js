const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const getUserByIdSchema = {
  params: strictSchema().prop("userId", S.string().required()),
};

const createProfileSchema = {
  body: S.object()
    .prop("email", S.string().required())
    .prop("name", S.string().required())
    .prop("country", S.string().required())
    .prop("neighborhood", S.string().required()),
};

module.exports = {
  getUserByIdSchema,
  createProfileSchema,
};
