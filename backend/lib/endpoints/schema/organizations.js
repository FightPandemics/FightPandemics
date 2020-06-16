const S = require("fluent-schema");
const { strictSchema } = require("./utils");
const { locationSchema } = require("./location");

const organization = {
  about: S.string().maxLength(100),
  email: S.string().format("email"),
  global: S.boolean(),
  industry: S.string(),
  language: S.string(),
  location: locationSchema,
  name: S.string(),
  needs: S.object()
    .prop("volunteers", S.boolean().required().default(false))
    .prop("donations", S.boolean().required().default(false))
    .prop("staff", S.boolean().required().default(false))
    .prop("other", S.boolean().required().default(false)),
  ownerId: S.string(),
  type: S.string(),
  urls: S.object()
    .prop("appStore", S.string())
    .prop("linkedin", S.string())
    .prop("playStore", S.string())
    .prop("twitter", S.string())
    .prop("website", S.string()),
};

const createOrganizationSchema = {
  body: strictSchema()
    .prop("about", organization.about)
    .prop("email", organization.email.required())
    .prop("global", organization.global.required())
    .prop("industry", organization.industry.required())
    .prop("language", organization.language)
    .prop("location", organization.location)
    .prop("name", organization.name.required())
    .prop("needs", organization.needs)
    .prop("ownerId", organization.ownerId.required())
    .prop("type", organization.type.required())
    .prop("urls", organization.urls)
    .required(["location"]),
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
    .prop("urls", organization.urls),
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
