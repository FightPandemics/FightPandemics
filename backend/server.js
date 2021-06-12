require("dotenv").config();

const createServer = require("./lib");
const { config } = require("./config");

const server = createServer(config);

server.ready(async () => {
  await server.oas();
});

server.listen(config.server.port, "0.0.0.0", (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
