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
  // expect(response.body[0]).to.have.property("name");
  expect(
    response.body.forEach((org) => {
      expect(org).to.have.a.property("_id");
      expect(org).to.have.a.property("name");
    }),
  );
};
