const cors = require("cors");
const fastify = require("fastify");

const auth = require("./endpoints/auth");
const geo = require("./endpoints/geo");
const posts = require("./endpoints/posts");
const users = require("./endpoints/users");
const version = require("./endpoints/version");

module.exports = function createApp(config) {
  const app = fastify({
    logger: true,
  });

  app.register(require("./plugins/mongoose-connector"), config.mongo);
  app.register(require("./plugins/auth"), config.auth);
  app.use(cors());

  app.get("/api/version", version);
  app.register(auth, { prefix: "/api/auth" });
  app.register(geo, { prefix: "/api/geo" });
  app.register(posts, { prefix: "/api/posts" });
  app.register(users, { prefix: "/api/users" });

  return app;
};
