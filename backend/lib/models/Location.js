const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  address: {
    lowercase: true,
    trim: true,
    type: String,
  },
  city: {
    lowercase: true,
    trim: true,
    type: String,
  },
  coordinates: {
    required: true,
    type: [Number],
    validate: {
      // Array must have two coordinates, with valid lng and lat values
      validator(array) {
        if (array[0].length !== 2) return false;
        if (array[0] > 180 || array[0] < -180) return false;
        if (array[1] > 90 || array[0] < -90) return false;

        return true;
      },
    },
  },
  country: {
    lowercase: true,
    trim: true,
    type: String,
  },
  neighborhood: {
    lowercase: true,
    trim: true,
    type: String,
  },
  state: {
    lowercase: true,
    trim: true,
    type: String,
  },
  type: {
    default: "Point",
    enum: ["Point"],
    required: true,
    type: String,
  },
  zip: {
    trim: true,
    type: String,
  },
});

const Location = model("Location", locationSchema);

const LOCATION_TYPES = locationSchema.tree.type.enum;

module.exports = {
  LOCATION_TYPES,
  model: Location,
  schema: locationSchema,
};
