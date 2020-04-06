require("dotenv").config();
const mongoose = require("mongoose");
const Fastify = require("fastify");
const createServer = require("./lib");
const { config, validateConfig } = require("./config");

validateConfig(config);
const fastify = Fastify({ logger: true });
const server = createServer(fastify);

mongoose.connect(config.mongo.uri, config.mongo.params);
mongoose.connection.on("error", (err) => {
  server.log.error(err);
  process.exit();
});

server.listen(config.server.port, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
