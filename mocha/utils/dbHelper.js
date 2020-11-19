const mongoose = require("mongoose");
const dbURI = "mongodb://mongo/fightpandemics";
mongoose.Promise = global.Promise;
const Post = require("../models/post");

exports.connectToDatabase = function () {
  mongoose
    .connect(dbURI)
    .then(() => console.log("DB Connection Successfull "))
    .catch((err) => {
      console.error(err);
    });
};

exports.disconnect = function () {
  mongoose.connection.close();
};

exports.findDocuments = async function () {
  try {
    return await Post.find({});
  } catch (err) {
    console.error("error");
  }
};
