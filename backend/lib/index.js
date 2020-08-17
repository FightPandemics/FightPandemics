// todo: fix this by avoiding to import if possible
// eslint-disable-next-line import/no-extraneous-dependencies
const Ajv = require("ajv");
const cors = require("cors");
const fastify = require("fastify");
const logStream = require("./logger");

const auth = require("./endpoints/auth");
const feedback = require("./endpoints/feedback");
const geo = require("./endpoints/geo");
const organisations = require("./endpoints/organisations");
const posts = require("./endpoints/posts");
const users = require("./endpoints/users");
const sendgrid = require("./endpoints/sendgrid");
const version = require("./endpoints/version");

module.exports = function createApp(config) {
  const logger = {
    level: config.logger.level,
    prettyPrint: config.env === "dev" ? {
      colorize: true,
      translateTime: "SYS:standard", 
    } : false,
  };
  if (config.logger.host) {
    logger.stream = logStream(config.logger);
  }
  const app = fastify({ logger });
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
  app.register(organisations, { prefix: "api/organisations" });
  app.register(posts, { prefix: "/api/posts" });
  app.register(users, { prefix: "/api/users" });
  app.register(sendgrid, { prefix: "/api/sendgrid" });
  app.get("/api/version", version);

  return app;
};
