const { Schema } = require("mongoose");

const notifyPreferenceSchema = new Schema({
  message: {
    instant: { default: true, type: Boolean },
    daily: { default: false, type: Boolean },
    weekly: { default: false, type: Boolean },
    biweekly: { default: false, type: Boolean },
  },
  like: {
    instant: { default: false, type: Boolean },
    daily: { default: false, type: Boolean },
    weekly: { default: true, type: Boolean },
    biweekly: { default: false, type: Boolean },
  },
  comment: {
    instant: { default: false, type: Boolean },
    daily: { default: true, type: Boolean },
    weekly: { default: false, type: Boolean },
    biweekly: { default: false, type: Boolean },
  },
  post: {
    instant: { default: false, type: Boolean },
    daily: { default: true, type: Boolean },
    weekly: { default: false, type: Boolean },
    biweekly: { default: false, type: Boolean },
  },
});

module.exports = {
  schema: notifyPreferenceSchema,
};
