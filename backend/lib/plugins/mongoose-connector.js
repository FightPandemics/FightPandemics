const fp = require("fastify-plugin");
const mongoose = require("mongoose");

const registerModels = require("../models");

async function dbConnector(app, config) {
  const connection = await mongoose.createConnection(config.uri, config.params);
  registerModels(connection);

  app.decorate("mongo", connection);
}

module.exports = fp(dbConnector);
