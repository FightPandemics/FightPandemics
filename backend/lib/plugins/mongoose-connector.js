const fp = require("fastify-plugin");
const mongoose = require("mongoose");

require("../models/Author");
require("../models/Comment");
require("../models/Feedback");
require("../models/Location");
require("../models/Organization");
require("../models/Post");
require("../models/User");

async function dbConnector(app, config) {
  const connection = await mongoose.createConnection(config.uri, config.params);

  app.decorate("mongo", connection);
}

module.exports = fp(dbConnector);
