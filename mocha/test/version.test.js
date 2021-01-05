const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiEndPoints = require("../utils/apiEndpoints");
const apiHelper = require("../utils/apiHelper");
const validator = require("../utils/validators");

let apiEndPoint = apiEndPoints.versionApiEndpoint;

describe("GET Version endpoint test", () => {
  it("Sending GET request with endpoint, status : 200 OK with response body", async () => {
    let response = await apiHelper.sendGETRequest(APP_URL, apiEndPoint);
    validator.validateResponse(response, {
      statusCode: httpStatus.OK,
    });

    validator.validateResponse(response.body, {
      commit: "unknown",
      serviceName: "fightpandemics",
      version: "1.0.0",
    });
  });
});
