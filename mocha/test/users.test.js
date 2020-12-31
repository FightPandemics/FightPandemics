const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiEndPoints = require("../utils/apiEndpoints");
const apiHelper = require("../utils/apiHelper");
const validator = require("../utils/validators");

let usersApiEndPoint = apiEndPoints.usersEndpoint;

describe("GET users endpoint tests", () => {
  it("sending GET request with users endpoint, status : 200 OK with response body", async () => {
    let response = await apiHelper.sendGETRequest(APP_URL, usersApiEndPoint);
    validator.validateStatusCodeResponseBody(
      response,
      200,
      "firstName",
      "lastName",
    );
  });
});
