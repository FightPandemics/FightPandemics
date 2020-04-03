const assert = require("assert");
const { name } = require("./package.json");

const config = {
  name,
  server: {
    port: process.env.PORT || 8000,
  },
  mongo: {
    host: `mongodb://${process.env.MONGO_URI}`,
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
      expiresIn: "7d",
    },
  },
  auth: {
    host: `https://${process.env.AUTH_HOST}`,
    clientId: process.env.AUTH_CLIENT_ID,
    secretKey: process.env.AUTH_SECRET_KEY,
  },
  joi: {
    params: {
      allowUnknown: true,
    },
  },
};

const validateConfig = () => {
  assert.ok(config.server.port, "Ensure PORT env is provided");
  assert.ok(config.mongo.host, "Ensure MONGO_URI env is provided");
  assert.ok(config.geoService.host, "Ensure GEO_SERVICE_URL env is provided.");
  assert.ok(config.jwt.key, "Ensure JWT_KEY env is provided.");
  assert.ok(config.auth.host, "Ensure AUTH_HOST env is provided.");
  assert.ok(config.auth.clientId, "Ensure AUTH_CLIENT_ID env is provided.");
  assert.ok(config.auth.secretKey, "Ensure AUTH_SECRET_KEY env is provided.");
};

module.exports = { config, validateConfig };
