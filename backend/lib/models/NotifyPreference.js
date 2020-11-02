const { Schema, model } = require("mongoose");

const notifyPreferenceSchema = new Schema({
  instant: {
    like: { default: true, type: Boolean },
    comment: { default: true, type: Boolean },
    share: { default: true, type: Boolean },
    message: { default: true, type: Boolean },
  },
  digest: {
    daily: { default: true, type: Boolean },
    weekly: { default: true, type: Boolean },
    biweekly: { default: true, type: Boolean },
  }
});

const NotifyPrefs = model("NotifyPrefs", notifyPreferenceSchema);

const defaultPrefs = () => {
  return new NotifyPrefs();
};

module.exports = {
  defaultPrefs,
  schema: notifyPreferenceSchema,
};
