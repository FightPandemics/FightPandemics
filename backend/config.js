const envSchema = require("env-schema");
const S = require("fluent-schema");

const { name } = require("./package.json");

const configData = envSchema({
  data: process.env,
  schema: S.object()
    .prop("AUTH_APP_URL", S.string())
    .prop("AUTH_CLIENT_ID", S.string().required())
    .prop("AUTH_DOMAIN", S.string().required())
    .prop("AUTH_SECRET_KEY", S.string().required())
    .prop("AUTH_STATE", S.string().required())
    .prop("ENVIRONMENT", S.string().default("dev").required())
    .prop("GEO_SERVICE_URL", S.string().required())
    .prop("MONGO_URI", S.string().required())
    .prop("PORT", S.number().default(8000).required()),
});

const config = {
  auth: {
    appUrl: configData.AUTH_APP_URL,
    clientId: configData.AUTH_CLIENT_ID,
    domain: `https://${configData.AUTH_DOMAIN}`,
    secretKey: configData.AUTH_SECRET_KEY,
    state: configData.AUTH_STATE,
  },
  env: configData.ENVIRONMENT,
  geoService: {
    host: `http://${configData.GEO_SERVICE_URL}`,
  },
  mongo: {
    params: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    uri: `mongodb://${configData.MONGO_URI}`,
  },
  name,
  server: {
    port: configData.PORT,
  },
};

module.exports = { config };
