const { DatabaseHelper } = require("./helpers/database-helper");
const { Mailer } = require("./helpers/mailer");
const { TemplateBuilder } = require("./helpers/template-builder");

class NotificationService {
  constructor(config) {
    this.mailer = new Mailer(config.mailService);
    this.dbHelper = new DatabaseHelper(config.database);
    this.templateBuilder = new TemplateBuilder();
  }

  async initializeDb(cachedDb = null) {
    return this.dbHelper.connect(cachedDb);
  }

  async process(frequency) {
    // TODO handle frequency - immediate, daily, weekly, bi-weekly
    const notifications = await this.dbHelper.findNotifications(frequency);
    if (notifications.length === 0) {
      console.log("No new notifications");
      return;
    }
    const emails = this.templateBuilder.build(frequency, notifications);
    const emailPayloads = emails.map((email) => {
      const { notificationId, ...buildPayloadParams } = email;
      return {
        notificationId,
        body: this.mailer.buildPayload(buildPayloadParams),
      };
    });

    // TODO optimize by promise batching (i.e. concurrently send 5-10 at a time, based on SES rate limits)
    // Our rate limit is 80 emails/second
    for (const payload of emailPayloads) {
      try {
        console.log(`sending email for notification ${payload.notificationId}`);
        await this.mailer.send(payload.body);
        await this.dbHelper.setEmailSentAt(payload.notificationId);
      } catch (error) {
        // Do not throw error if one email fails to send; continue processing remaining emails.
        // TODO log to Papertrail and Sentry
        console.log(error);
      }
    }
  }
}

module.exports = {
  NotificationService,
};
