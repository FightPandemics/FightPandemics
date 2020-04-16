const assert = require("assert");
const { name } = require("./package.json");

const config = {
  auth: {
    appUrl: process.env.AUTH_APP_URL,
    clientId: process.env.AUTH_CLIENT_ID,
    domain: `https://${process.env.AUTH_DOMAIN}`,
    secretKey: process.env.AUTH_SECRET_KEY,
    state: process.env.AUTH_STATE,
  },
  geoService: {
    host: `http://${process.env.GEO_SERVICE_URL}`,
  },
  mongo: {
    params: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    uri: `mongodb://${process.env.MONGO_URI}`,
  },
  name,
  server: {
    port: process.env.PORT || 8000,
  },
};

const validateConfig = () => {
  assert.ok(config.server.port, "Ensure PORT env is provided");
  assert.ok(config.mongo.uri, "Ensure MONGO_URI env is provided");
  assert.ok(config.geoService.host, "Ensure GEO_SERVICE_URL env is provided.");
  assert.ok(config.auth.domain, "Ensure AUTH_DOMAIN env is provided.");
  assert.ok(config.auth.clientId, "Ensure AUTH_CLIENT_ID env is provided.");
  assert.ok(config.auth.secretKey, "Ensure AUTH_SECRET_KEY env is provided.");
  assert.ok(config.auth.state, "Ensure AUTH_STATE env is provided.");
};

module.exports = { config, validateConfig };
