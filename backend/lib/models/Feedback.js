const { model, Schema } = require("mongoose");

const FeedbackSchema = new Schema(
  {
    age: {
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
      type: Number,
    },
    covidImpact: String,
    generalFeedback: String,
    ipAddress: {
      required: true,
      type: String,
    },
    location: Object(),
    mostValuableFeature: String,
    rating: {
      get: (v) => Math.round(v),
      max: 5,
      min: 1,
      required: true,
      set: (v) => Math.round(v),
      type: Number,
    },
    userId: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    whatWouldChange: String,
  },
  { collection: "feedbacks", timestamps: true },
);

const Feedback = model("Feedback", feedbackSchema);

exports.model = Feedback;
exports.schema = feedbackSchema;
