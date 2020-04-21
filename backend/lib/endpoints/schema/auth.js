const S = require("fluent-schema");

const loginSchema = {
  body: S.object()
    .prop("email", S.string().required())
    .prop("password", S.string().required()),
};

// todo: add password confirmation as required field
const signupSchema = {
  body: S.object()
    .prop("email", S.string().required())
    .prop("password", S.string().required()),
};

module.exports = {
  loginSchema,
  signupSchema,
};
