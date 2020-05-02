const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const createFeedbackSchema = {
  body: strictSchema()
    .prop("age", S.integer())
    .prop("covidImpact", S.string())
    .prop("generalFeedback", S.string())
    .prop("mostValuableFeature", S.string())
    .prop("rating", S.integer().required())
    .prop("userId", S.string())
    .prop("whatWouldChange", S.string()),
};

module.exports = {
  createFeedbackSchema,
};
