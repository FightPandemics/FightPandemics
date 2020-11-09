const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiEndPoints = require("../utils/apiEndpoints");
const apiHelper = require("../utils/apiHelper");
const validator = require("../utils/validators");

let apiEndPoint = apiEndPoints.feedbackEndpoint;

let feedbackWithValidInputs = {
  age: 20,
  covidImpact: "I have mild symptoms but haven't been tested",
  generalFeedback: "None",
  mostValuableFeature:
    "The option to filter by request or offer help on the Help Board",
  rating: 5,
  whatWouldChange: "Offer more Provider filter tags",
};

let feedbackWithInvalidAge = {};
Object.assign(feedbackWithInvalidAge, feedbackWithValidInputs);
Object.assign(feedbackWithInvalidAge, { age: "%" });

let feedbackWithNegativeAge = {};
Object.assign(feedbackWithNegativeAge, feedbackWithValidInputs);
Object.assign(feedbackWithNegativeAge, { age: -5 });

let feedbackWithInvalidRating = {};
Object.assign(feedbackWithInvalidRating, feedbackWithValidInputs);
Object.assign(feedbackWithInvalidRating, { rating: "%" });

let feedbackWithNegativeRating = {};
Object.assign(feedbackWithNegativeRating, feedbackWithValidInputs);
Object.assign(feedbackWithNegativeRating, { rating: -5 });

let feedbackWithBlankInputs = {
  age: "",
  covidImpact: "",
  generalFeedback: "",
  mostValuableFeature: "",
  rating: "",
  whatWouldChange: "",
};

describe("POST Feedback endpoint tests", () => {
  describe("Unauthorized user enters feedback data", () => {
    it("Valid feedback data triggers Success message", async () => {
      let response = await apiHelper.sendPOSTRequest(
        APP_URL,
        apiEndPoint,
        feedbackWithValidInputs,
      );
      validator.validateStatusCodeAndSuccess(response, 201, true);
    });

    it("Invalid data type in Age question triggers Bad Request message", async () => {
      let response = await apiHelper.sendPOSTRequest(
        APP_URL,
        apiEndPoint,
        feedbackWithInvalidAge,
      );
      validator.validateStatusCodeErrorAndMessage(
        response,
        httpStatus.BAD_REQUEST,
        "Bad Request",
        "body.age should be integer",
      );
    });

    //Currently a negative age triggers a success status and message which is incorrect. Test case will fail until status is fixed.
    it("Negative number in Age question triggers Bad Request message", async () => {
      let response = await apiHelper.sendPOSTRequest(
        APP_URL,
        apiEndPoint,
        feedbackWithNegativeAge,
      );
      validator.validateStatusCodeErrorAndMessage(
        response,
        httpStatus.BAD_REQUEST,
        "Bad Request",
        "body.age should be positive integer",
      );
    });

    it("Invalid data type in Rating question triggers Bad Request message", async () => {
      let response = await apiHelper.sendPOSTRequest(
        APP_URL,
        apiEndPoint,
        feedbackWithInvalidRating,
      );
      validator.validateStatusCodeErrorAndMessage(
        response,
        httpStatus.BAD_REQUEST,
        "Bad Request",
        "body.rating should be integer",
      );
    });

    //Currently a negative rating triggers a 500 internal server error which is incorrect, should be a 400 bad request error instead. Test case will fail until status is fixed.
    it("Negative number in Rating question triggers Bad Request message", async () => {
      let response = await apiHelper.sendPOSTRequest(
        APP_URL,
        apiEndPoint,
        feedbackWithNegativeRating,
      );
      validator.validateStatusCodeErrorAndMessage(
        response,
        httpStatus.BAD_REQUEST,
        "Bad Request",
        "body.rating should be positive integer",
      );
    });
  });

  describe("Unauthorized user does not enter any feedback data", () => {
    it("Leaving all feedback fields blank triggers Bad Request message", async () => {
      let response = await apiHelper.sendPOSTRequest(
        APP_URL,
        apiEndPoint,
        feedbackWithBlankInputs,
      );
      validator.validateStatusCodeErrorAndMessage(
        response,
        httpStatus.BAD_REQUEST,
        "Bad Request",
        "body.age should be integer, body.rating should be integer",
      );
    });
  });
});
