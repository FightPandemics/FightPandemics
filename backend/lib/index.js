// todo: fix this by avoiding to import if possible
// eslint-disable-next-line import/no-extraneous-dependencies
const Ajv = require("ajv");
const cors = require("cors");
const fastify = require("fastify");

const auth = require("./endpoints/auth");
const geo = require("./endpoints/geo");
const organizations = require("./endpoints/organizations");
const posts = require("./endpoints/posts");
const users = require("./endpoints/users");
const version = require("./endpoints/version");

module.exports = function createApp(config) {
  const app = fastify({
    logger: true,
  });
  const ajv = new Ajv({
    allErrors: true,
    coerceTypes: true,
    nullable: true,
    removeAdditional: false,
    useDefaults: true,
  });
  app.setSchemaCompiler((schema) => {
    return ajv.compile(schema);
  });

  app.register(require("fastify-sensible"));
  app.register(require("fastify-oas"), {
    exposeRoute: true,
  });
  app.register(require("./plugins/mongoose-connector"), config.mongo);
  app.register(require("./plugins/auth"), config.auth);
  app.use(cors());

  app.get("/api/version", version);
  app.register(auth, { prefix: "/api/auth" });
  app.register(geo, { prefix: "/api/geo" });
  app.register(organizations, { prefix: "api/organizations" });
  app.register(posts, { prefix: "/api/posts" });
  app.register(users, { prefix: "/api/users" });

  return app;
};
