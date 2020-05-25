// todo: fix this by avoiding to import if possible
// eslint-disable-next-line import/no-extraneous-dependencies
const Ajv = require("ajv");
const cors = require("cors");
const fastify = require("fastify");

const auth = require("./endpoints/auth");
const feedback = require("./endpoints/feedback");
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

  app.register(require("./plugins/error-handler"), config.errorNotifier);
  app.register(
    require("fastify-sensible"),
    { errorHandler: false }, // Set errorHandler to false so we can use our custom error handler above.
  );
  app.register(require("fastify-oas"), {
    exposeRoute: true,
    routePrefix: "/api/documentation",
  });
  app.register(require("./plugins/mongoose-connector"), config.mongo);
  app.register(require("./plugins/auth"), config.auth);
  app.use(cors());

  app.register(auth, { prefix: "/api/auth" });
  app.register(feedback, { prefix: "/api/feedback" });
  app.register(geo, { prefix: "/api/geo" });
  app.register(organizations, { prefix: "api/organizations" });
  app.register(posts, { prefix: "/api/posts" });
  app.register(users, { prefix: "/api/users" });
  app.get("/api/version", version);

  return app;
};
