const { result, cond } = require("lodash");
const mongoose = require("mongoose");
const dbURI = "mongodb://mongo/fightpandemics";
mongoose.Promise = global.Promise;

exports.connectToDatabase = function () {
  mongoose
    .connect(dbURI)
    .then(() => console.log("DB Connection Successfull "))
    .catch((err) => {
      console.error(err.message);
    });
};

exports.disconnect = function () {
  mongoose.connection.close();
};

exports.findDocuments = async function (collectionName) {
  try {
    return await mongoose.connection.collection(collectionName).find({});
  } catch (err) {
    console.error("findDocuments error" + err.message);
  }
};

exports.findDocumentsWithCondition = async function (
  collectionName,
  condition,
) {
  try {
    return await mongoose.connection.collection(collectionName).find(condition);
  } catch (err) {
    console.error("findDocumentsWithCondition error " + err.message);
  }
};

exports.findOneDocumentWithCondition = async function (
  collectionName,
  condition,
) {
  try {
    return await mongoose.connection
      .collection(collectionName)
      .findOne(condition);
  } catch (err) {
    console.error("findOneDocumentWithCondition error " + err.message);
  }
};
//result contains insertedId and ops array -> inserted doc
exports.insertDocument = async function (Model, collectionName) {
  try {
    return await mongoose.connection
      .collection(collectionName)
      .insertOne(Model);
  } catch (err) {
    console.error("insert error" + err.message);
  }
};

exports.deleteDocument = async function (collectionName, condition) {
  try {
    return await mongoose.connection
      .collection(collectionName)
      .deleteOne(condition);
  } catch (err) {
    console.error("delete error" + err.message);
  }
};
