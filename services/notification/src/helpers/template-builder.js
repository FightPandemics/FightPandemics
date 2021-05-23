const { EmailFrequency } = require("../models/email-frequency");
const {
  EmailFrequencyTrackingCode,
} = require("../models/email-frequency-tracking-code");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { MessageThreadStatus } = require("../models/message-thread-status");
const Mustache = require("mustache");
const path = require("path");
const { ShareMedium } = require("../models/share-medium");

class TemplateBuilder {
  constructor(baseUrl, tokenKey) {
    this.baseUrl = baseUrl;
    this.tokenKey = tokenKey;
    this.templates = {
      base: {
        html: this._loadTemplateFile("../templates/base.html"),
        text: this._loadTemplateFile("../templates/base.txt"),
      },
      biweekly: {
        html: this._loadTemplateFile("../templates/digests/biweekly.html"),
        subject: "Your FightPandemics activity over the past two weeks",
        text: this._loadTemplateFile("../templates/digests/biweekly.txt"),
      },
      daily: {
        html: this._loadTemplateFile("../templates/digests/daily.html"),
        subject: "Your FightPandemics activity over the past day",
        text: this._loadTemplateFile("../templates/digests/daily.txt"),
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
        message: {
          html: this._loadTemplateFile("../templates/instant/message.html"),
          subject: "{{senderName}} sent you a direct message",
          text: this._loadTemplateFile("../templates/instant/message.txt"),
        },
        messageRequest: {
          html: this._loadTemplateFile(
            "../templates/instant/message-request.html",
          ),
          subject: "{{senderName}} sent you a direct message request",
          text: this._loadTemplateFile(
            "../templates/instant/message-request.txt",
          ),
        },
        share: {
          html: this._loadTemplateFile("../templates/instant/share.html"),
          subject: "{{triggeredBy.name}} shared your post: {{post.title}}",
          text: this._loadTemplateFile("../templates/instant/share.txt"),
        },
        newapplicant: {
          html: this._loadTemplateFile("../templates/instant/newapplicant.html"),
          subject: "{{triggeredBy.name}} applied to your organisation",
          text: this._loadTemplateFile("../templates/instant/newapplicant.txt"),
        },
      },
      post: {
        html: this._loadTemplateFile("../templates/digests/_post.html"),
        text: this._loadTemplateFile("../templates/digests/_post.txt"),
      },
      weekly: {
        html: this._loadTemplateFile("../templates/digests/weekly.html"),
        subject: "Your FightPandemics activity over the past week",
        text: this._loadTemplateFile("../templates/digests/weekly.txt"),
      },
    };
  }

  build(frequency, notifications) {
    if (frequency === EmailFrequency.INSTANT) {
      return this._buildInstant(notifications);
    } else if (frequency === EmailFrequency.MESSAGE) {
      return this._buildDirectMessages(notifications);
    }
    return this._buildDigest(frequency, notifications);
  }

  _buildDirectMessages(notifications) {
    return notifications
      .map((notification) => {
        const { sender, receiver, message } = notification;
        const notifyPrefs = receiver.notifyPrefs;
        if (notifyPrefs && !notifyPrefs.instant.message) {
          return;
        }
        const token = this._generateToken(receiver.id);
        const templateKey =
          receiver.status === MessageThreadStatus.PENDING
            ? "messageRequest"
            : "message";
        const htmlTemplate = Mustache.render(this.templates.base.html, {
          baseUrl: this.baseUrl,
          body: this.templates.instant[templateKey].html,
          token,
        });
        const textTemplate = Mustache.render(this.templates.base.text, {
          baseUrl: this.baseUrl,
          body: this.templates.instant[templateKey].text,
          token,
        });
        const subject = Mustache.render(
          this.templates.instant[templateKey].subject,
          {
            senderName: sender.name,
          },
        );
        const view = {
          baseUrl: this.baseUrl,
          senderName: sender.name,
          postTextCopy: message.postRef
            ? `for your post ${message.postRef.title}`
            : null, // TODO localize
        };

        if (templateKey === "message") {
          view.message = message.content;
        }

        const trackerParams = this._buildTrackerParams("message");

        return {
          htmlBody: Mustache.render(htmlTemplate, { ...view, trackerParams }),
          notificationId: message._id,
          subject,
          textBody: Mustache.render(textTemplate, view),
          toEmailAddress: receiver.email,
        };
      })
      .filter((email) => !!email);
  }

  _buildDigest(frequency, notifications) {
    return notifications
      .map((notification) => {
        const notifyPrefs = notification.receiver.notifyPrefs;
        const posts = notification.posts;
        if (notifyPrefs && !notifyPrefs.digest[frequency]) {
          return;
        }
        const token = this._generateToken(notification.receiver._id);
        const htmlTemplate = Mustache.render(this.templates.base.html, {
          baseUrl: this.baseUrl,
          body: this.templates[frequency].html,
          token,
        });
        const textTemplate = Mustache.render(this.templates.base.text, {
          baseUrl: this.baseUrl,
          body: this.templates[frequency].text,
          token,
        });
        const subject = this.templates[frequency].subject;

        const postHtmlTemplates = posts.map((post) =>
          Mustache.render(this.templates.post.html, {
            baseUrl: this.baseUrl,
            latestComment: post.latest,
            post: post.post,
            actionCounts: this._generatePostCountsCopy(post.counts),
            trackerParams: this._buildTrackerParams(frequency),
          }),
        );
        const postTextTemplates = posts.map((post) =>
          Mustache.render(this.templates.post.text, {
            baseUrl: this.baseUrl,
            latestComment: post.latest,
            post: post.post,
            actionCounts: this._generatePostCountsCopy(post.counts),
          }),
        );

        const htmlView = {
          posts: postHtmlTemplates.join(" "),
        };
        const textView = {
          posts: postTextTemplates.join("<br>"),
        };

        return {
          htmlBody: Mustache.render(htmlTemplate, htmlView),
          notificationId: null,
          subject,
          textBody: Mustache.render(textTemplate, textView),
          toEmailAddress: notification.receiver.email,
        };
      })
      .filter((email) => !!email);
  }

  _buildInstant(notifications) {
    return notifications
      .map((notification) => {
        const action = notification.action;
        const notifyPrefs = notification.receiver.notifyPrefs;
        if (notifyPrefs && !notifyPrefs.instant[action]) {
          return;
        }
        const token = this._generateToken(notification.receiver._id);
        const htmlTemplate = Mustache.render(this.templates.base.html, {
          baseUrl: this.baseUrl,
          body: this.templates.instant[action].html,
          token,
        });
        const textTemplate = Mustache.render(this.templates.base.text, {
          baseUrl: this.baseUrl,
          body: this.templates.instant[action].text,
          token,
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

        if (notification.commentText) {
          view.commentText = notification.commentText;
        }

        if (notification.sharedVia) {
          view.shareMedium = ShareMedium[notification.sharedVia.toUpperCase()];
        }

        const trackerParams = this._buildTrackerParams("instant");

        return {
          htmlBody: Mustache.render(htmlTemplate, { ...view, trackerParams }),
          notificationId: notification._id,
          subject,
          textBody: Mustache.render(textTemplate, view),
          toEmailAddress: notification.receiver.email,
        };
      })
      .filter((email) => !!email);
  }

  _buildTrackerParams(frequency) {
    const languageCode = "EN"; // TODO set this based on user localization preference
    const frequencyCode = EmailFrequencyTrackingCode[frequency];
    const campaignName = `E-A-PU-WW-${languageCode}-NOT-ENGA-${frequencyCode}`;
    return `?utm_source=Email&utm_medium=Email&utm_campaign=${campaignName}`;
  }

  _loadTemplateFile(relPath) {
    return fs.readFileSync(path.join(__dirname, relPath), {
      encoding: "utf-8",
    });
  }

  _generateToken(userId) {
    const token = jwt.sign({ userId }, this.tokenKey, { expiresIn: "30d" });
    return token;
  }

  // TODO localize
  _generatePostCountsCopy(counts) {
    const countCopies = [];
    // We show the first comment preview, so we only need to display
    // the comment count if there are additional comments on the post.
    if (counts.comment > 1) {
      countCopies.push(`${counts.comment - 1} more comment(s)`);
    }
    if (counts.like > 0) {
      countCopies.push(`${counts.like} like(s)`);
    }
    // Commenting out since shares can't be seen on the post. If we implement badge counter for shares, we can uncomment
    // if (counts.share > 0) {
    //   countCopies.push(`${counts.share} share(s)`);
    // }
    return countCopies.join(", ");
  }
}

module.exports = {
  TemplateBuilder,
};
