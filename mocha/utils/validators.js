const { expect } = require("chai");

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

exports.validateStatusBody = function (
  response,
  statusCode,
  value1,
  value2,
  value3,
) {
  // var org = JSON.parse(responseBody);
  //expect(org.body).to.have.a.property("_id").to.be.equal(responseBody);
  expect(response.statusCode).to.be.equal(statusCode);

  expect(response.body).to.have.a.property("_id").to.be.equal(value1);
  expect(response.body).to.have.a.property("ownerId").to.be.equal(value2);
  expect(response.body).to.have.a.property("type").to.be.equal(value3);
};
