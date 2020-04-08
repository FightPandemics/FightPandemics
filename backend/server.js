require("dotenv").config();

const createServer = require("./lib");
const { config, validateConfig } = require("./config");

validateConfig(config);
const server = createServer(config);

server.listen(config.server.port, "0.0.0.0", (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
