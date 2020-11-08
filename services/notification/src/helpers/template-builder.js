const { EmailFrequency } = require("../models/email-frequency");
const fs = require("fs");
const jwt = require("jsonwebtoken");
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
        share: {
          html: this._loadTemplateFile("../templates/instant/share.html"),
          subject: "{{triggeredBy.name}} shared your post: {{post.title}}",
          text: this._loadTemplateFile("../templates/instant/share.txt"),
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
    }
    return this._buildDigest(frequency, notifications);
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
    if (counts.share > 0) {
      countCopies.push(`${counts.share} share(s)`);
    }
    return countCopies.join(", ");
  }
}

module.exports = {
  TemplateBuilder,
};
