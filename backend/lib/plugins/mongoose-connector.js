const fp = require("fastify-plugin");
const mongoose = require("mongoose");

require("../models/Author");
require("../models/Comment");
require("../models/Feedback");
require("../models/Location");
require("../models/IndividualUser");
require("../models/Message");
require("../models/OrganisationUser");
require("../models/Post");
require("../models/Thread");
require("../models/User");

async function syncIndexes(mongo) {
  mongo.model("Author").syncIndexes();
  mongo.model("Comment").syncIndexes();
  mongo.model("Feedback").syncIndexes();
  mongo.model("Location").syncIndexes();
  mongo.model("Message").syncIndexes();
  mongo.model("Post").syncIndexes();
  mongo.model("Thread").syncIndexes();
  mongo.model("User").syncIndexes();
}

async function dbConnector(app, config) {
  const connection = await mongoose.createConnection(config.uri, config.params);
  app.decorate("mongo", connection);
  syncIndexes(app.mongo);
}

module.exports = fp(dbConnector);
