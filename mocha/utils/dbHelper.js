const mongoose = require("mongoose");
const dbURI = "mongodb://mongo/fightpandemics";
mongoose.Promise = global.Promise;

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

exports.findDocuments = async function (Model) {
  try {
    return await Model.find({});
  } catch (err) {
    console.error("error");
  }
};

exports.findDocumentsWithCondition = async function (Model, condition) {
  try {
    return await Model.find(condition);
  } catch (err) {
    console.error("error");
  }
};

exports.findOneDocumentWithCondition = async function (Model, condition) {
  try {
    return await Model.findOne(condition);
  } catch (err) {
    console.error("error");
  }
};

exports.insertDocument = async function (Model, collectionName) {
  try {
    return await mongoose.connection
      .collection(collectionName)
      .insertOne(Model);
  } catch (err) {
    console.error("error");
  }
};
