const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const createUserSchema = {
  body: strictSchema()
    .prop("name", S.string().required())
    .prop("country", S.string().required())
    .prop("city", S.string())
    .prop("neighborhood", S.string())
    .prop("address", S.string())
    .prop("wants", S.array().maxItems(3).items(S.string()))
    .prop("needs", S.array().maxItems(3).items(S.string())),
};

const getUserByIdSchema = {
  params: strictSchema().prop("userId", S.string().required()),
};

module.exports = {
  createUserSchema,
  getUserByIdSchema,
};
