const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Post = require("../models/post");

exports.connectToDatabase = function () {
  mongoose
    .connect("mongodb://127.0.0.1/fightpandemics")
    .then(() => console.log("DB Connection Successfull "))
    .catch((err) => {
      console.error(err);
    });
};

exports.disconnect = function () {
  mongoose.connection.close();
};

exports.retrivePostFromDb = function () {
  // console.log("Get post test");
  // console.log("Get post test 2");
  // const collections = Object.keys(mongoose.connection.collections);
  // console.log(collections);
  return Post.find({}, function (err, posts) {
    if (err) {
      console.log("Get post test 3");
    } else {
      console.log("Get post test 4 " + posts.toString());
      return posts;
    }
  });
};
