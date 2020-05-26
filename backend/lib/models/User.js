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
    location: Object,
    name: {
      required: true,
      type: String,
    },
    needs: {
      type: Array,
    },
    photo: String,
    type: String,
    wants: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
);

const User = model("User", UserSchema);

exports.model = User;
exports.schema = UserSchema;
