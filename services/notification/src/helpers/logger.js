const { config } = require("../config");
const papertrail = require("pino-papertrail");
const pino = require("pino");
const pinoms = require("pino-multi-stream");
const util = require("util");

class Logger {
  constructor() {
    this.logger = config.logger.enabled
      ? this.paperTrailLogger()
      : this.consoleLogger();
    this.logger.info(
      `Logger initialized - ${config.logger.level} - ${config.logger.host}:${config.logger.port}`,
    );
  }

  debug(messageObj) {
    this.logger.debug(this.getObjectMessage(messageObj));
  }

  verbose(messageObj) {
    this.logger.verbose(this.getObjectMessage(messageObj));
  }

  info(messageObj) {
    this.logger.info(this.getObjectMessage(messageObj));
  }

  warn(messageObj) {
    this.logger.warn(this.getObjectMessage(messageObj));
  }

  error(errorObj, messageObj) {
    this.logger.error(errorObj, this.getObjectMessage(messageObj));
  }

  getObjectMessage(messageObj, full = false) {
    if (typeof messageObj === "string") {
      return messageObj;
    } else {
      return full
        ? util.inspect(messageObj, {
            showHidden: false,
            depth: null,
            breakLength: Infinity,
          })
        : util.inspect(messageObj);
    }
  }

  paperTrailLogger() {
    const options = {
      appname: config.appName,
      host: config.logger.host,
      level: config.logger.level,
      port: config.logger.port,
    };
    const stream = papertrail.createWriteStream(options);
    return pinoms({
      streams: [{ stream }],
    });
  }

  consoleLogger() {
    const options = {
      level: config.logger.level,
      prettyPrint:
        config.nodeEnv === "dev"
          ? {
              colorize: true,
              translateTime: "SYS:standard",
            }
          : false,
    };
    return pino(options);
  }
}

const log = new Logger();

module.exports = {
  Logger,
  log,
};
