const { expect } = require("chai");
//const {should} = require("should");

exports.validateStatusCodeErrorAndMessage = function (
  response,
  statusCode,
  error,
  message,
) {
  expect(response.body)
    .to.have.a.property("statusCode")
    .to.be.equal(statusCode);
  expect(response.body).to.have.a.property("error").to.be.equal(error);
  expect(response.body).to.have.a.property("message").to.be.equal(message);
};

exports.validateStatusCodeAndSuccess = function (
  response,
  statusCode,
  successMessage,
) {
  expect(response.statusCode).to.be.equal(statusCode);
  expect(response.body)
    .to.have.a.property("success")
    .to.be.equal(successMessage);
};

exports.validateStatusCode = function (response, statusCode) {
  expect(response.statusCode).to.be.equal(statusCode);
};

exports.validateStatusBody = function (response, statusCode) {
  expect(response.statusCode).to.be.equal(statusCode);
  expect(response.body).toString;
  expect(response.body).to.have.any.keys(
    "_t",
    "_v",
    "_id",
    "createdAt",
    "email",
    "global",
    "industry",
    "isOwner",
    "language",
    "location",
    "name",
    "needs",
    "notifyPrefs",
    "ownerId",
    "photo",
    "type",
    "updatedAt",
  );
};
