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
    const emails = this.templateBuilder.build(frequency, notifications);
    const emailPayloads = emails.map((email) =>
      this.mailer.buildPayload(email),
    );
    // TODO optimize by promise batching (i.e. concurrently send 5-10 at a time, based on SES rate limits)
    for (const payload of emailPayloads) {
      await this.mailer.send(payload);
    }
  }
}

module.exports = {
  NotificationService,
};
