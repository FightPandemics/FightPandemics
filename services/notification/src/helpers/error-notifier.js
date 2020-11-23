const { config } = require("../config");
const { log } = require("./logger");
const Sentry = require("@sentry/node")

class ErrorNotifier {
  constructor() {
    if (config.errorNotifier.url) {
      this.notifier = Sentry;
      Sentry.init({
        dsn: config.errorNotifier.url,
        environment: config.nodeEnv,
        serverName: config.appName,
      });
    } else {
      // Default to stubbed notifier
      this.notifier = {
        captureException: (errorObject) =>
          log.warn("Error Notifier URL not set, cannot send to Sentry."),
        flush: async (timeout) => Promise.resolve(),
      };
    }
  }

  async capture(errorObject) {
    this.notifier.captureException(errorObject);
    await this.notifier.flush(2000);
  }
}

const errorNotifier = new ErrorNotifier();
module.exports = {
  errorNotifier,
};
