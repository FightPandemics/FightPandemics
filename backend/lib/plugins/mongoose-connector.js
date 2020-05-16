const fp = require("fastify-plugin");
const mongoose = require("mongoose");

require("../models/author");
require("../models/Comment");
require("../models/Feedback");
require("../models/location");
require("../models/Organization");
require("../models/post");
require("../models/User");

async function dbConnector(app, config) {
  const connection = await mongoose.createConnection(config.uri, config.params);

  app.decorate("mongo", connection);
}

module.exports = fp(dbConnector);
