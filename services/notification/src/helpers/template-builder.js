const fs = require("fs");
const Mustache = require("mustache");
const path = require("path");

class TemplateBuilder {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.templates = {
      base: {
        html: this._loadTemplateFile("../templates/base.html"),
        text: this._loadTemplateFile("../templates/base.txt"),
      },
      instant: {
        comment: {
          html: this._loadTemplateFile("../templates/instant/comment.html"),
          subject:
            "{{triggeredBy.name}} commented on your post: {{post.title}}",
          text: this._loadTemplateFile("../templates/instant/comment.txt"),
        },
        like: {
          html: this._loadTemplateFile("../templates/instant/like.html"),
          subject: "{{triggeredBy.name}} liked your post: {{post.title}}",
          text: this._loadTemplateFile("../templates/instant/like.txt"),
        },
        share: {
          html: this._loadTemplateFile("../templates/instant/share.html"),
          subject: "{{triggeredBy.name}} shared your post: {{post.title}}",
          text: this._loadTemplateFile("../templates/instant/share.txt"),
        },
      },
    };
  }

  build(frequency, notifications) {
    // TODO need to come up with algorithm to go through user's notifications, and then come up with a summary email
    // that groups the notifications
    // For now just handle instant
    return this._buildInstant(notifications);
  }

  _buildInstant(notifications) {
    return notifications
      .map((notification) => {
        const action = notification.action;
        if (
          notification.receiver.notifyPrefs &&
          !notification.receiver.notifyPrefs[action].instant
        ) {
          return;
        }
        const htmlTemplate = Mustache.render(this.templates.base.html, {
          baseUrl: this.baseUrl,
          body: this.templates.instant[action].html,
        });
        const textTemplate = Mustache.render(this.templates.base.text, {
          baseUrl: this.baseUrl,
          body: this.templates.instant[action].text,
        });
        const subject = Mustache.render(
          this.templates.instant[action].subject,
          {
            post: notification.post,
            triggeredBy: notification.triggeredBy,
          },
        );
        const view = {
          baseUrl: this.baseUrl,
          post: notification.post,
          triggeredBy: notification.triggeredBy,
        };
        return {
          htmlBody: Mustache.render(htmlTemplate, view),
          notificationId: notification._id,
          subject,
          textBody: Mustache.render(textTemplate, view),
          toEmailAddress: notification.receiver.email,
        };
      })
      .filter((email) => !!email);
  }

  _loadTemplateFile(relPath) {
    return fs.readFileSync(path.join(__dirname, relPath), {
      encoding: "utf-8",
    });
  }
}

module.exports = {
  TemplateBuilder,
};
