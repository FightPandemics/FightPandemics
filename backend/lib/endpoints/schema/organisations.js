const S = require("fluent-schema");
const { strictSchema } = require("./utils");
const { locationSchema } = require("./location");

const organisation = {
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

const createOrganisationSchema = {
  body: strictSchema()
    .prop("about", organisation.about)
    .prop("email", organisation.email.required())
    .prop("global", organisation.global.default(false))
    .prop("industry", organisation.industry.required())
    .prop("language", organisation.language)
    .prop("location", organisation.location)
    .prop("name", organisation.name.required())
    .prop("needs", organisation.needs)
    .prop("type", organisation.type.required())
    .prop("urls", organisation.urls)
    .required(["location"]),
};

const getOrganisationSchema = {
  params: strictSchema().prop("organisationId", S.string().required()),
};

// TODO: Maybe add search param in query string?
const getOrganisationsSchema = {
  querystring: strictSchema()
    .prop("limit", S.integer())
    .prop("ownerId", S.string())
    .prop("skip", S.integer()),
};

const updateOrganisationSchema = {
  body: strictSchema()
    .prop("about", organisation.about)
    .prop("email", organisation.email)
    .prop("global", organisation.global)
    .prop("industry", organisation.industry)
    .prop("language", organisation.language)
    .prop("location", organisation.location)
    .prop("name", organisation.name)
    .prop("needs", organisation.needs)
    .prop("type", organisation.type)
    .prop("urls", organisation.urls),
  params: strictSchema().prop("organisationId", S.string().required()),
};

const deleteOrganisationSchema = {
  params: strictSchema().prop("organisationId", S.string().required()),
};

module.exports = {
  createOrganisationSchema,
  deleteOrganisationSchema,
  getOrganisationSchema,
  getOrganisationsSchema,
  updateOrganisationSchema,
};
