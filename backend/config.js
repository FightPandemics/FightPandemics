const assert = require("assert");
const { name } = require("./package.json");

const config = {
  name,
  server: {
    port: process.env.PORT || 8000,
  },
  mongo: {
    uri: `mongodb://${process.env.MONGO_URI}`,
    params: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  geoService: {
    host: `http://${process.env.GEO_SERVICE_URL}`,
  },
  jwt: {
    key: process.env.JWT_KEY,
    params: {
      algorithm: "RS512",
      noTimestamp: true,
    },
  },
  auth: {
    domain: `https://${process.env.AUTH_HOST}`,

    clientId: process.env.AUTH_CLIENT_ID,
    secret: process.env.AUTH_SECRET_KEY,
  },
  joi: {
    params: {
      allowUnknown: true,
    },
  },
};

const validateConfig = () => {
  assert.ok(config.server.port, "Ensure PORT env is provided");
  assert.ok(config.mongo.uri, "Ensure MONGO_URI env is provided");
  assert.ok(config.geoService.host, "Ensure GEO_SERVICE_URL env is provided.");
  assert.ok(config.jwt.key, "Ensure JWT_KEY env is provided.");
  assert.ok(config.auth.domain, "Ensure AUTH_HOST env is provided.");
  assert.ok(config.auth.clientId, "Ensure AUTH_CLIENT_ID env is provided.");
  assert.ok(config.auth.secret, "Ensure AUTH_SECRET_KEY env is provided.");
};

module.exports = { config, validateConfig };
