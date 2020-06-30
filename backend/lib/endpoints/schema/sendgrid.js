const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const sendgridContactSchema = {
  body: strictSchema()
    .prop("email", S.string().format("email").required())
    .prop("location", S.object().required())
    .prop("helpType", S.string())
    .prop("postType", S.string())
    .prop("providers", S.array()),
};

module.exports = { sendgridContactSchema };
