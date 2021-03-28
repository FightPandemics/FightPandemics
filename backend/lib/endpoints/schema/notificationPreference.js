const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const notifyPreferenceSchema = strictSchema()
  .prop(
    "instant",
    S.object()
      .prop("like", S.boolean().default(true))
      .prop("comment", S.boolean().default(true))
      .prop("share", S.boolean().default(true))
      .prop("message", S.boolean().default(true))
      .prop("orgPosts", S.boolean().default(false))
      .prop("newapplicant", S.boolean().default(false)),

  )
  .prop(
    "digest",
    S.object()
      .prop("daily", S.boolean().default(true))
      .prop("weekly", S.boolean().default(true))
      .prop("biweekly", S.boolean().default(true)),
  );

const updateNotifyPrefsSchema = {
  body: strictSchema().prop("notifyPrefs", notifyPreferenceSchema),
};

module.exports = {
  notifyPreferenceSchema,
  updateNotifyPrefsSchema,
};
