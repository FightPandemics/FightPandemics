const AWS = require("aws-sdk");

class Mailer {
  constructor(config) {
    AWS.config.update({
      accessKeyId: config.apiKeyId,
      secretAccessKey: config.apiKey,
      region: config.region,
    });
    this.client = new AWS.SESV2({
      apiVersion: "2019-09-27",
    });
    this.fromEmailAddress = config.fromEmailAddress;
  }

  // TODO we could consider using SES personalized emails based on templates. But I am not sure if our use case is
  // too complicated since we need to merge in HTML partials.
  // See https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-personalized-email-api.html
  buildPayload(email) {
    return {
      Content: {
        Simple: {
          Body: {
            Html: {
              Data: email.htmlBody,
              Charset: "UTF-8",
            },
            Text: {
              Data: email.textBody,
              Charset: "UTF-8",
            },
          },
          Subject: {
            Data: email.subject,
            Charset: "UTF-8",
          },
        },
      },
      Destination: {
        ToAddresses: [email.toEmailAddress],
      },
      FromEmailAddress: this.fromEmailAddress,
    };
  }

  async send(emailPayload) {
    return this.client.sendEmail(emailPayload).promise();
  }
}

module.exports = {
  Mailer,
};
