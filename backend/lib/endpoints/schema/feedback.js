const S = require("fluent-schema");
const { errorSchema, strictSchema } = require("./utils");

const feedbackSchema = strictSchema()
  .prop("age", S.integer().minimum(1).maximum(150))
  .prop("covidImpact", S.string())
  .prop("generalFeedback", S.string())
  .prop("mostValuableFeature", S.string())
  .prop("rating", S.integer().minimum(1).maximum(5))
  .prop("userId", S.string())
  .prop("whatWouldChange", S.string());

const createFeedbackSchema = {
  body: feedbackSchema.required(["rating"]),
  connection: strictSchema().prop(
    "remoteAddress",
    S.string().format("ipv4").format("ipv6").required(),
  ),
  description: "For creating a new feedback record in the database.",
  response: {
    201: S.object().prop("success", S.boolean()),
    400: errorSchema(),
    500: errorSchema(),
  },
};

module.exports = {
  createFeedbackSchema,
};
