const S = require("fluent-schema");
const {
  errorSchema,
  strictSchema,
  strictQueryStringSchema,
} = require("./utils");
const { locationSchema } = require("./location");
const { notifyPreferenceSchema } = require("./notificationPreference");

const organisation = {
  about: S.string().maxLength(260),
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

const organisationSchema = strictSchema()
  .prop("_id", organisation._id)
  .prop("about", organisation.about)
  .prop("email", organisation.email)
  .prop("global", organisation.global)
  .prop("industry", organisation.industry)
  .prop("language", organisation.language)
  .prop("location", organisation.location)
  .prop("name", organisation.name)
  .prop("needs", organisation.needs)
  .prop("type", organisation.type)
  .prop("urls", organisation.urls);

const organisationMetaDataSchema = strictSchema()
  .prop("__t", organisation.__t)
  .prop("createdAt", organisation.createdAt)
  .prop("updatedAt", organisation.updatedAt);

const createOrganisationSchema = {
  description: "For creating organisation record in the database.",
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
    .prop("notifyPrefs", notifyPreferenceSchema)
    .required(["location"]),
  response: {
    200: S.object()
      .prop("notifyPrefs", notifyPreferenceSchema)
      .prop("ownerId", organisation.ownerId)
      .extend(organisationMetaDataSchema)
      .extend(organisationSchema),
    400: errorSchema(),
    409: errorSchema(),
    500: errorSchema(),
  },
};

const createOrganisationAvatarSchema = {
  description:
    "For updating organisation record in the database with an Avatar photo.",
  body: strictSchema().prop("file", S.required()),
  params: strictSchema().prop("organisationId", S.string().required()),
  response: {
    200: S.object()
      .prop("notifyPrefs", notifyPreferenceSchema)
      .prop("ownerId", organisation.ownerId)
      .prop("photo", organisation.photo)
      .extend(organisationMetaDataSchema)
      .extend(organisationSchema),
    400: errorSchema(),
    404: errorSchema(),
    500: errorSchema(),
  },
};

const getOrganisationSchema = {
  description: "For fetching organisation detailed record from the database.",
  params: strictSchema().prop("organisationId", S.string().required()),
  response: {
    200: S.object()
      .prop("notifyPrefs", notifyPreferenceSchema)
      .prop("isOwner", S.boolean())
      .extend(organisationSchema),
    404: errorSchema(),
    500: errorSchema(),
  },
};

// TODO: Maybe add search param in query string?
const getOrganisationsSchema = {
  description: "For fetching all organisation records from the database.",
  querystring: strictQueryStringSchema()
    .prop("ownerId", S.string())
    .prop("skip", S.integer()),
};

const searchOrganisationsSchema = {
  description: "For searching organisation record in the database.",
  querystring: strictQueryStringSchema()
    .prop("filter", S.string())
    .prop("keywords", S.string())
    .prop("objective", S.string())
    .prop("skip", S.integer())
    .prop("includeMeta", S.boolean().default(false)),
  response: {
    200: S.array().items(
      S.object()
        .prop("notifyPrefs", notifyPreferenceSchema)
        .extend(organisationSchema),
    ),
    400: errorSchema(),
    500: errorSchema(),
  },
};

const updateOrganisationSchema = {
  description: "For updating organisation record in the database.",
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
    .prop("urls", organisation.urls)
    .prop("notifyPrefs", notifyPreferenceSchema),
  params: strictSchema().prop("organisationId", S.string().required()),
  response: {
    200: S.object()
      .prop("notifyPrefs", notifyPreferenceSchema)
      .prop("ownerId", organisation.ownerId)
      .extend(organisationMetaDataSchema)
      .extend(organisationSchema),
    404: errorSchema(),
    500: errorSchema(),
  },
};

const deleteOrganisationSchema = {
  description: "For deleting organisation record in the database.",
  params: strictSchema().prop("organisationId", S.string().required()),
  response: {
    200: S.object()
      .prop(
        "deletedOrganisation",
        S.object()
          .prop("notifyPrefs", notifyPreferenceSchema)
          .prop("ownerId", organisation.ownerId)
          .extend(organisationMetaDataSchema)
          .extend(organisationSchema),
      )
      .prop("success", S.boolean()),
    404: errorSchema(),
    500: errorSchema(),
  },
};

module.exports = {
  createOrganisationAvatarSchema,
  createOrganisationSchema,
  deleteOrganisationSchema,
  getOrganisationSchema,
  getOrganisationsSchema,
  searchOrganisationsSchema,
  updateOrganisationSchema,
};
