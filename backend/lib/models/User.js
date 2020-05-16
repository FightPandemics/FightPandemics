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
    location: Object,
    type: String,
  },
  {
    timestamps: true,
  },
);

const User = model("User", UserSchema);

exports.model = User;
exports.schema = UserSchema;
