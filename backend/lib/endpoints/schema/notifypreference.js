const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const notifyPreferenceSchema = strictSchema()
  .prop(
    "message",
    S.object()
      .prop("instant", S.boolean().default(true))
      .prop("daily", S.boolean().default(false))
      .prop("weekly", S.boolean().default(false))
      .prop("biweekly", S.boolean().default(false)),
  )
  .prop(
    "like",
    S.object()
      .prop("instant", S.boolean().default(false))
      .prop("daily", S.boolean().default(false))
      .prop("weekly", S.boolean().default(true))
      .prop("biweekly", S.boolean().default(false)),
  )
  .prop(
    "comment",
    S.object()
      .prop("instant", S.boolean().default(false))
      .prop("daily", S.boolean().default(true))
      .prop("weekly", S.boolean().default(false))
      .prop("biweekly", S.boolean().default(false)),
  )
  .prop(
    "post",
    S.object()
      .prop("instant", S.boolean().default(false))
      .prop("daily", S.boolean().default(true))
      .prop("weekly", S.boolean().default(false))
      .prop("biweekly", S.boolean().default(false)),
  );

const updateNotifyPrefsSchema = {
  body: strictSchema()
    .prop("notifyPrefs", notifyPreferenceSchema),
};

module.exports = {
  updateNotifyPrefsSchema,
};
