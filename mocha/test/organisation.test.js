const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiEndPoints = require("../utils/apiEndpoints");
const apiHelper = require("../utils/apiHelper");
const validator = require("../utils/validators");

let orgApiEndPoint = apiEndPoints.organisationsEndpoint;

describe("GET organisations endpoint tests", () => {
  it("sending GET request with endpoint, status : 200 OK with response body", async () => {
    let response = await apiHelper.sendGETRequest(APP_URL, orgApiEndPoint);
    validator.validateStatusCodeResponseBody(response, 200, "name", "_id");
  });
});
