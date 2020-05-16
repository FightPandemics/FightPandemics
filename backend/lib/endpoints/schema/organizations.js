const S = require("fluent-schema");
const { strictSchema } = require("./utils");

const createOrganizationSchema = {
  body: strictSchema()
    .prop("email", S.string().required())
    .prop("global", S.boolean())
    .prop("industry", S.string().required())
    .prop("location", S.string().required())
    .prop("name", S.string().required())
    .prop("needs", S.array().maxItems(10).items(S.string()).required())
    .prop("type", S.string()),
};

const getOrganizationSchema = {
  params: strictSchema().prop("organizationId", S.string().required()),
};

// TODO: Maybe add search param in query string?
const getOrganizationsSchema = {
  querystring: strictSchema()
    .prop("limit", S.integer())
    .prop("ownerId", S.string())
    .prop("skip", S.integer()),
};

const updateOrganizationSchema = {
  body: strictSchema()
    .prop("about", S.string())
    .prop("email", S.string())
    .prop("global", S.boolean())
    .prop("industry", S.string())
    .prop("language", S.string())
    .prop("location", S.string())
    .prop("name", S.string())
    .prop("needs", S.array().maxItems(10).items(S.string()))
    .prop("ownerId", S.string())
    .prop("type", S.string())
    .prop(
      "url",
      S.object()
        .prop("appStore", S.string().format("url"))
        .prop("linkedin", S.string().format("url"))
        .prop("playStore", S.string().format("url"))
        .prop("twitter", S.string().format("url"))
        .prop("website", S.string().format("url")),
    ),
  params: strictSchema().prop("organizationId", S.string().required()),
};

const deleteOrganizationSchema = {
  params: strictSchema().prop("organizationId", S.string().required()),
};

module.exports = {
  createOrganizationSchema,
  deleteOrganizationSchema,
  getOrganizationSchema,
  getOrganizationsSchema,
  updateOrganizationSchema,
};
