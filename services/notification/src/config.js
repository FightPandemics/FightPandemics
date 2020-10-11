const config = {
  database: {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
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
