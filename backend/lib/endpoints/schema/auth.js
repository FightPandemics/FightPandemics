const S = require("fluent-schema");

const loginSchema = {
  body: S.object()
    .additionalProperties(false)
    .prop("email", S.string().required())
    .prop("password", S.string().required()),
};

// todo: add password confirmation as required field
const signupSchema = {
  body: S.object()
    .additionalProperties(false)
    .prop("email", S.string().required())
    .prop("password", S.string().required()),
};

const oAuthSchema = {
  body: S.object()
    .additionalProperties(false)
    .prop("code", S.string().required())
    .prop("state", S.string().required()),
};

const oAuthProviderSchema = {
  params: S.object().prop(
    "provider",
    S.enum(["google", "facebook", "linkedin", "twitter"]).required(),
  ),
};

module.exports = {
  loginSchema,
  oAuthProviderSchema,
  oAuthSchema,
  signupSchema,
};
