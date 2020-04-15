const S = require("fluent-schema");

const getUserByIdSchema = {
  params: S.object().prop("userId", S.string().required()),
};

module.exports = {
  getUserByIdSchema,
};
