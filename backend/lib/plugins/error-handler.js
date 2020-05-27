const fp = require("fastify-plugin");
const Sentry = require("@sentry/node");

// Default Fastify-Sensible error handler
// https://github.com/fastify/fastify-sensible/blob/5eec059b2a77579f75bafc91e12f60fb90b6dab5/index.js#L46
function defaultErrorHandler(error, request, reply) {
  if (
    reply.raw.statusCode === 500 &&
    error.explicitInternalServerError !== true
  ) {
    request.log.error(error);
    reply.send(new Error("Something went wrong"));
  } else {
    reply.send(error);
  }
}

function errorNotifierHandler(error, request, reply) {
  Sentry.withScope((scope) => {
    scope.setUser({
      ip_address: request.raw.ip,
    });
    scope.setTag("path", request.raw.url);
    Sentry.captureException(error);
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
