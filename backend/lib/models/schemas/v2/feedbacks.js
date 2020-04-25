const { Schema, model } = require("mongoose");
const { schema: locationSchema } = require("./location");

// -- Schema
const feedbackSchema = new Schema(
  {
    _id: {
      required: true,
      type: Schema.Types.ObjectId,
    },
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
    location: locationSchema,
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
      ref: "IndividualUser",
      type: Schema.Types.ObjectId,
    },
    whatWouldChange: String,
  },
  { collection: "feedbacks", timestamps: true },
);

// -- Model
const Feedback = model("Feedback", feedbackSchema);

exports.schema = feedbackSchema;
exports.model = Feedback;
