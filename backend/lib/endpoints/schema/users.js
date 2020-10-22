const S = require("fluent-schema");
const { strictSchema } = require("./utils");
const { locationSchema } = require("./location");

// todo: upgrade to shorter regex when AJV supported, see https://github.com/ajv-validator/ajv/blob/master/lib/compile/formats.js#L16
//  const URL_REGEX = /^(?:(?:https?):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;
// eslint-disable-next-line no-control-regex
const URL_REGEX = /^(?:(?:http[s\u017F]?):\/\/)?(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i;

const needsSchema = S.object()
  .prop("medicalHelp", S.boolean().required().default(false))
  .prop("otherHelp", S.boolean().required().default(false));

const objectivesSchema = S.object()
  .prop("donate", S.boolean().required().default(false))
  .prop("shareInformation", S.boolean().required().default(false))
  .prop("volunteer", S.boolean().required().default(false));

const hideSchema = S.object().prop("address", S.boolean().default(false));

const urlsSchema = S.object()
  .prop(
    "facebook",
    S.anyOf([
      S.null(),
      S.string()
        .pattern(/^[a-zA-Z0-9.]*$/)
        .minLength(5),
    ]).required(),
  )
  .prop(
    "github",
    S.anyOf([S.null(), S.string().pattern(/^[a-zA-Z0-9_-]*$/)]).required(),
  )
  .prop(
    "linkedin",
    S.anyOf([S.null(), S.string().pattern(/^[a-zA-Z0-9-]*$/)]).required(),
  )
  .prop(
    "twitter",
    S.anyOf([
      S.null(),
      S.string()
        .pattern(/^[a-zA-Z0-9_]*$/)
        .maxLength(15),
    ]).required(),
  )
  .prop("website", S.oneOf([S.null(), S.string().pattern(URL_REGEX)]));

const createUserSchema = {
  body: strictSchema()
    .prop("firstName", S.string().required())
    .prop("lastName", S.string().required())
    .prop("hide", hideSchema)
    .prop("needs", needsSchema)
    .prop("objectives", objectivesSchema)
    .prop("url", urlsSchema)
    .prop("location", locationSchema)
    .required(["location"]),
};

const getUsersSchema = {
  querystring: strictSchema()
    .prop("filter", S.string())
    .prop("keywords", S.string())
    .prop("limit", S.integer())
    .prop("objective", S.string())
    .prop("skip", S.integer())
    .prop("includeMeta", S.boolean().default(false)),
};

const createUserAvatarSchema = {
  body: strictSchema().prop("file", S.required()),
};

const getUserByIdSchema = {
  params: strictSchema().prop("userId", S.string().required()),
};

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
  body: strictSchema().prop("notifyPrefs", notifyPreferenceSchema),
};

const updateUserSchema = {
  body: strictSchema()
    .prop("about", S.string().maxLength(160))
    .prop("firstName", S.string())
    .prop("lastName", S.string())
    .prop("hide", hideSchema)
    .prop("location", locationSchema)
    .prop("needs", needsSchema)
    .prop("objectives", objectivesSchema)
    .prop("photo", S.string().pattern(URL_REGEX))
    .prop("urls", urlsSchema)
    .prop("notifyPrefs", notifyPreferenceSchema),
};

module.exports = {
  createUserAvatarSchema,
  createUserSchema,
  getUserByIdSchema,
  getUsersSchema,
  updateUserSchema,
  updateNotifyPrefsSchema,
};
