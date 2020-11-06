const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiEndPoints = require("../utils/apiEndpoints");
const apiHelper = require("../utils/apiHelper");
const validator = require("../utils/validators");

let apiEndPoint = apiEndPoints.feedbackEndpoint;

let feedbackWithValidInputs = {};
Object.assign(feedbackWithValidInputs, { age: 20 });
Object.assign(feedbackWithValidInputs, {
  covidImpact: "I have mild symptoms but haven't been tested",
});
Object.assign(feedbackWithValidInputs, { generalFeedback: "None" });
Object.assign(feedbackWithValidInputs, {
  mostValuableFeature:
    "The option to filter by request or offer help on the Help Board",
});
Object.assign(feedbackWithValidInputs, { rating: 5 });
Object.assign(feedbackWithValidInputs, {
  whatWouldChange: "Offer more Provider filter tags",
});

describe("POST Feedback endpoint tests", () => {
  describe("Unauthorized user enters valid feedback data", () => {
    it("Valid feedback data triggers Success message", async () => {
      let response = await apiHelper.sendPOSTRequest(
        APP_URL,
        apiEndPoint,
        feedbackWithValidInputs,
      );
      validator.validateStatusCodeAndSuccess(response, 201, true);
    });
  });
});
