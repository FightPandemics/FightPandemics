require("dotenv").config();

const config = {
  appName: `fp-notification-${process.env.NODE_ENV || "dev"}`,
  database: {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    instantUnreadLookbackInterval: Number(
      process.env.INSTANT_UNREAD_LOOKBACK_INTERVAL || 5,
    ),
    retryWrites: process.env.DATABASE_RETRY_WRITES === "true",
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    protocol: process.env.DATABASE_PROTOCOL || "mongodb",
    username: process.env.DATABASE_USERNAME,
  },
  errorNotifier: {
    url: process.env.ERROR_NOTIFIER_URL,
  },
  logger: {
    enabled: process.env.EXTERNAL_LOGGER_ENABLED === "true",
    host: process.env.EXTERNAL_LOGGER_HOST,
    level: process.env.LOG_LEVEL || "debug",
    port: Number(process.env.EXTERNAL_LOGGER_PORT),
  },
  mailService: {
    apiKeyId: process.env.SES_AWS_ACCESS_KEY_ID,
    apiKey: process.env.SES_AWS_SECRET_ACCESS_KEY,
    fromEmailAddress: process.env.FROM_EMAIL_ADDRESS,
    region: process.env.SES_AWS_REGION,
  },
  nodeEnv: process.env.NODE_ENV,
};

module.exports = {
  config,
};
