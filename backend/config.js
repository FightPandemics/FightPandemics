const assert = require("assert");
const { name } = require("./package.json");

const validateConfig = () => {
  assert.ok(config.server.port, "Ensure PORT env is provided");
  assert.ok(config.mongo.host, "Ensure MONGO_URI env is provided");
  assert.ok(config.geoService.host, "Ensure GEO_SERVICE_URL env is provided.");
  assert.ok(config.jwt.key, "Ensure JWT_KEY env is provided.");
};

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
    host: process.env.GEO_SERVICE_URL,
  },
  jwt: {
    key: process.env.JWT_KEY,
    params: {
      expiresIn: "7d",
    },
  },
};

module.exports = { config, validateConfig };
