const envSchema = require("env-schema");
const url = require("url");
const S = require("fluent-schema");

const { name } = require("./package.json");

const configData = envSchema({
  data: process.env,
  schema: S.object()
    .prop("AIRTABLE_API_KEY", S.string())
    .prop("AIRTABLE_BASE_ID", S.string())
    .prop("APP_DOMAIN", S.string().default("localhost"))
    .prop("AUTH_APP_URL", S.string())
    .prop("AUTH_CLIENT_ID", S.string().required())
    .prop("AUTH_COOKIE_MAX_AGE_SECONDS", S.number().default(86400))
    .prop("AUTH_DOMAIN", S.string().required())
    .prop("AUTH_SECRET_KEY", S.string().required())
    .prop("AUTH_STATE", S.string().required())
    .prop("AWS_ACCESS_KEY_ID", S.string().default("dummy_access_key"))
    .prop("AWS_SECRET_ACCESS_KEY_ID", S.string().default("dummy_secret_access_key"))
    .prop("AWS_REGION", S.string().default("us-east-1"))
    .prop("CDN_BASE_URL", S.string().default("http://localstack:4566"))
    .prop("COMMIT_HASH", S.string())
    .prop("GOOGLE_MAPS_API_KEY", S.string())
    .prop("LOGGER_HOST", S.string())
    .prop("LOGGER_LEVEL", S.string().default("info"))
    .prop("LOGGER_PORT", S.number().default(1234))
    .prop("MONGO_URI", S.string().required())
    .prop("NODE_ENV", S.string().required())
    .prop("PORT", S.number().default(8000).required())
    .prop("S3_CDN_BUCKET", S.string().default("fp-dev-cdn"))
    .prop("SENTRY_DSN", S.string())
    .prop("SENDGRID_API_KEY", S.string())
    .prop("SENDGRID_CONTACTS_LIST_ID", S.string()),
});

const config = {
  airtable: {
    apiKey: configData.AIRTABLE_API_KEY,
    baseId: configData.AIRTABLE_BASE_ID,
  },
  appDomain: configData.APP_DOMAIN,
  auth: {
    appUrl: configData.AUTH_APP_URL,
    clientId: configData.AUTH_CLIENT_ID,
    cookieMaxAgeSeconds: configData.AUTH_COOKIE_MAX_AGE_SECONDS,
    domain: `https://${configData.AUTH_DOMAIN}`,
    jwtMongoIdKey: url.resolve(configData.AUTH_APP_URL, "mongo_id"),
    secretKey: configData.AUTH_SECRET_KEY,
    state: configData.AUTH_STATE,
  },
  cdn: {
    awsAccessKeyId: configData.AWS_ACCESS_KEY_ID,
    awsSecretAccessKeyId: configData.AWS_SECRET_ACCESS_KEY_ID,
    awsRegion: configData.AWS_REGION,
    baseUrl: configData.CDN_BASE_URL,
    s3Bucket: configData.S3_CDN_BUCKET,
  },
  env: configData.NODE_ENV,
  errorNotifier: {
    environment: configData.NODE_ENV,
    release: configData.COMMIT_HASH,
    url: configData.SENTRY_DSN,
  },
  geo: {
    googleMapsApiKey: configData.GOOGLE_MAPS_API_KEY,
  },
  logger: {
    appname: `fp-backend-${configData.NODE_ENV}`,
    host: configData.LOGGER_HOST,
    level: configData.LOGGER_LEVEL,
    port: configData.LOGGER_PORT,
  },
  mongo: {
    params: {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    uri:
      configData.MONGO_URI.startsWith("mongodb://") ||
      configData.MONGO_URI.startsWith("mongodb+srv://")
        ? configData.MONGO_URI
        : `mongodb://${configData.MONGO_URI}`,
  },
  name,
  sendgrid: {
    apiKey: configData.SENDGRID_API_KEY,
    contactsListId: configData.SENDGRID_CONTACTS_LIST_ID,
  },
  server: {
    port: configData.PORT,
  },
};

module.exports = { config };
