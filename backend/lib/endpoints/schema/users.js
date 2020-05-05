const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const getUserByIdSchema = {
  params: strictSchema().prop("userId", S.string().required()),
};

module.exports = {
  getUserByIdSchema,
};
