const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiHelper = require("../utils/apiHelper");
const apiEndPointHelper = require("../utils/apiEndpoints");
const validator = require("../utils/validators");
const testData = require("../utils/testData");
let apiEndPoint = apiEndPointHelper.loginApiEndpoint;
let userCredentialsWithRandomEmailAndRandomPassword =
  testData.userCredentialsWithRandomEmailAndRandomPassword;
let userCredentialsWithRandomEmail = testData.userCredentialsWithRandomEmail;
let userCredentialsWithEmptyEmail = testData.userCredentialsWithEmptyEmail;
let userCredentialsWithInvalidEmailNoDomainSpecified =
  testData.userCredentialsWithInvalidEmailNoDomainSpecified;
let userCredentialsWithEmailLocalExceeding64Characters =
  testData.userCredentialsWithEmailLocalExceeding64Characters;
let userCredentialsWithEmailExceeding254Characters =
  testData.userCredentialsWithEmailExceeding254Characters;

describe("POST Login endpoint tests for user that is NOT signed in", function () {
  describe("400  - bad request", function () {
    it("Bad request error - when trying to log in without signed in", async function () {
      let response = await apiHelper.sendPOSTRequest(
        APP_URL,
        apiEndPoint,
        userCredentialsWithRandomEmailAndRandomPassword,
      );
      validator.validateResponse(response.body, {
        statusCode: httpStatus.BAD_REQUEST,
        error: "Bad Request",
        message: "noEmailAccount",
      });
    });
  });

  describe("429 - maximum sign in attempts", function () {
    it("Too Many Requests error - when maximum sign in attempts are exceeded", async function () {
      let response;
      for (var i = 0; i < 11; i++) {
        response = await apiHelper.sendPOSTRequest(
          APP_URL,
          apiEndPoint,
          userCredentialsWithRandomEmail,
        );
      }
      validator.validateResponse(response.body, {
        statusCode: httpStatus.TOO_MANY_REQUESTS,
        error: "Too Many Requests",
        message: "maxSignInAttemptsExceeded",
      });
    });
  });

  describe("Incorrect email data", function () {
    it("Empty email triggers Bad Request error", async function () {
      let response = await apiHelper.sendPOSTRequest(
        APP_URL,
        apiEndPoint,
        userCredentialsWithEmptyEmail,
      );
      validator.validateResponse(response.body, {
        statusCode: httpStatus.BAD_REQUEST,
        error: "Bad Request",
        message: 'body.email should match format "email"',
      });
    });

    it("Invalid email syntax triggers Bad Request error", async function () {
      let response = await apiHelper.sendPOSTRequest(
        APP_URL,
        apiEndPoint,
        userCredentialsWithInvalidEmailNoDomainSpecified,
      );
      validator.validateResponse(response.body, {
        statusCode: httpStatus.BAD_REQUEST,
        error: "Bad Request",
        message: 'body.email should match format "email"',
      });
    });

    it("Email local part bigger than 64 characters triggers Bad request error", async function () {
      let response = await apiHelper.sendPOSTRequest(
        APP_URL,
        apiEndPoint,
        userCredentialsWithEmailLocalExceeding64Characters,
      );
      validator.validateResponse(response.body, {
        statusCode: httpStatus.BAD_REQUEST,
        error: "Bad Request",
        message: "noEmailAccount",
      });
    });

    //following the rules that Auth0 are using the email needs to have 64max for the local part and an overall max of 254 chars
    it("Email domain part bigger than 189 characters. Total bigger than 254 characters triggers Bad request error", async function () {
      let response = await apiHelper.sendPOSTRequest(
        APP_URL,
        apiEndPoint,
        userCredentialsWithEmailExceeding254Characters,
      );
      validator.validateResponse(response.body, {
        statusCode: httpStatus.BAD_REQUEST,
        error: "Bad Request",
        message: 'body.email should match format "email"',
      });
    });
  });
});
