require("dotenv").config();

const config = {
  database: {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    retryWrites: process.env.DATABASE_RETRY_WRITES,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    protocol: process.env.DATABASE_PROTOCOL || "mongodb",
    username: process.env.DATABASE_USERNAME,
  },
  mailService: {
    apiKeyId: process.env.SES_AWS_ACCESS_KEY_ID,
    apiKey: process.env.SES_AWS_SECRET_ACCESS_KEY,
    fromEmailAddress: process.env.FROM_EMAIL_ADDRESS,
    region: process.env.SES_AWS_REGION,
  },
};

module.exports = {
  config,
};
