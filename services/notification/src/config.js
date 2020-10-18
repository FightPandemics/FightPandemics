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
  feedbackForwardingEmailAddress: process.env.FEEDBACK_FORWARDING_EMAIL_ADDRESS,
  fromEmailAddress: process.env.FROM_EMAIL_ADDRESS,
  mailService: {
    apiKeyId: process.env.SES_AWS_ACCESS_KEY_ID,
    apiKey: process.env.SES_AWS_SECRET_ACCESS_KEY,
    region: process.env.SES_AWS_REGION,
  },
  replyToEmailAddress: process.env.REPLY_TO_EMAIL_ADDRESS,
};

module.exports = {
  config,
};
