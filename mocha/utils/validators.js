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

exports.validateStatusCodeResponseBody = function (
  response,
  statusCode,
  key1,
  key2,
) {
  expect(response.statusCode).to.be.equal(statusCode);
  expect(
    response.body.forEach((object) => {
      expect(object).to.have.a.property(key1);
      expect(object).to.have.a.property(key2);
    }),
  );
};
