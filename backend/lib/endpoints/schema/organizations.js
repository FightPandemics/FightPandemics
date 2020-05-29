const S = require("fluent-schema");
const { strictSchema } = require("./utils");
const { locationSchema } = require("./location");

const organization = {
  about: S.string(),
  email: S.string().format("email"),
  global: S.boolean(),
  industry: S.string(),
  language: S.string(),
  location: locationSchema,
  name: S.string(),
  needs: S.array().maxItems(10).items(S.string()),
  ownerId: S.string(),
  type: S.string(),
  url: S.object()
    .prop("appStore", S.string().format("url"))
    .prop("linkedin", S.string().format("url"))
    .prop("playStore", S.string().format("url"))
    .prop("twitter", S.string().format("url"))
    .prop("website", S.string().format("url")),
};

const createOrganizationSchema = {
  body: strictSchema()
    .prop("about", organization.about)
    .prop("email", organization.email.required())
    .prop("global", organization.global.required())
    .prop("industry", organization.industry.required())
    .prop("language", organization.language.required())
    .prop("location", organization.location.required())
    .prop("name", organization.name.required())
    .prop("needs", organization.needs)
    .prop("ownerId", organization.ownerId.required())
    .prop("type", organization.type.required())
    .prop("url", organization.url),
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
    .prop("about", organization.about)
    .prop("email", organization.email)
    .prop("global", organization.global)
    .prop("industry", organization.industry)
    .prop("language", organization.language)
    .prop("location", organization.location)
    .prop("name", organization.name)
    .prop("needs", organization.needs)
    .prop("ownerId", organization.ownerId)
    .prop("type", organization.type)
    .prop("url", organization.url),
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
