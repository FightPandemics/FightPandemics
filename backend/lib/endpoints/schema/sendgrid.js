const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const sendgridContactSchema = {
  body: strictSchema()
    .prop("email", S.string().format("email").required())
    .prop("location", S.anyOf([S.object(), S.string()]))
    .prop("helpType", S.string())
    .prop("postType", S.string())
    .prop("providers", S.array()),
};

module.exports = { sendgridContactSchema };
