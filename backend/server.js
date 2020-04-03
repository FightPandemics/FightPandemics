require("dotenv").config();
const mongoose = require("mongoose");
const http = require("http");
const createApp = require("./lib");
const { config, validateConfig } = require("./config");

validateConfig(config);
const server = http.createServer(createApp());

// Connect to MongoDB
mongoose.connect(config.mongo.host, config.mongo.params);
mongoose.connection.once("open", () => {
  // All OK - fire (emit) a ready event.
  server.emit("ready");
});

/* eslint-disable no-console */
server.on("ready", () => {
  server
    .listen(config.server.port)
    .on("listening", () => {
      console.info({
        message: `Listening on ${server.address().address}:${
          server.address().port
        }`,
      });
    })
    .on("error", (err) => {
      console.fatal({ message: "Cannot start http server", err });
      throw err;
    });
});
/* eslint-enable no-console */
