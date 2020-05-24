const fp = require("fastify-plugin");
const Sentry = require("@sentry/node");

// Default Fastify error handler
// https://github.com/fastify/fastify/blob/5bc406d4c6677131237f85b6ae69fe9e34d4b8dd/lib/context.js#L29
function defaultErrorHandler(error, request, reply) {
  if (reply.statusCode >= 500) {
    reply.log.error(
      { req: request, res: reply, err: error },
      error && error.message,
    );
  } else if (reply.statusCode >= 400) {
    reply.log.info({ res: reply, err: error }, error && error.message);
  }
  reply.send(error);
}

function errorNotifierHandler(error, request, reply) {
  Sentry.withScope((scope) => {
    scope.setUser({
      ip_address: request.raw.ip,
    });
    scope.setTag("path", request.raw.url);
    Sentry.captureException(err);
    defaultErrorHandler(error, request, reply);
  });
}

function errorHandler(app, config, done) {
  let errorHandler = defaultErrorHandler;
  if (config.url) {
    Sentry.init({
      dsn: config.url,
      environment: config.environment,
      release: config.release,
    });
    errorHandler = errorNotifierHandler;
  }
  app.setErrorHandler(errorHandler);
  done();
}

module.exports = fp(errorHandler);
