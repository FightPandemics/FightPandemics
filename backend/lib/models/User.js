const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    _id: {
      required: true,
      type: Schema.Types.ObjectId,
    },
    address: {
      type: String,
    },
    location: {
      ref: "Location",
      type: Schema.Types.ObjectId,
    },
    name: {
      required: true,
      type: String,
    },
    needs: {
      type: Array,
    },
    wants: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("User", UserSchema);
