const S = require("fluent-schema");

const createOrganizationSchema = {
  body: S.object()
    .prop("email", S.string().required())
    .prop("global", S.boolean())
    .prop("industry", S.string().required())
    .prop("location", S.string().required())
    .prop("name", S.string().required())
    .prop("needs", S.array().maxItems(10).items(S.string()).required())
    .prop("type", S.string()),
};

const getOrganizationSchema = {
  params: S.object().prop("organizationId", S.string().required()),
};

// TODO: Maybe add search param in query string?
const getOrganizationsSchema = {
  querystring: S.object()
    .prop("limit", S.integer())
    .prop("ownerId", S.string())
    .prop("skip", S.integer()),
};

const updateOrganizationSchema = {
  body: S.object()
    .prop("address", S.string())
    .prop("androidUrl", S.string())
    .prop("description", S.string())
    .prop("email", S.string().required())
    .prop("global", S.boolean())
    .prop("industry", S.string().required())
    .prop("iosUrl", S.string())
    .prop("language", S.string())
    .prop("linkedinUrl", S.string())
    .prop("location", S.string().required())
    .prop("name", S.string().required())
    .prop("needs", S.array().maxItems(10).items(S.string()).required())
    .prop("ownerId", S.string())
    .prop("twitterUrl", S.string())
    .prop("type", S.string())
    .prop("website", S.string()),
  params: S.object().prop("organizationId", S.string().required()),
};

const deleteOrganizationSchema = {
  params: S.object().prop("organizationId", S.string().required()),
};

module.exports = {
  createOrganizationSchema,
  deleteOrganizationSchema,
  getOrganizationSchema,
  getOrganizationsSchema,
  updateOrganizationSchema,
};
