const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiEndPoints = require("../utils/apiEndpoints");
const apiHelper = require("../utils/apiHelper");
const validator = require("../utils/validators");

let orgApiEndPoint = apiEndPoints.organisationsEndpoint;
//let ownerId = "5fc7aa97c0cdcc003855f304";

describe("GET organisations endpoint tests", () => {
  it("sending GET request with endpoint, status : 200 OK with org details", async () => {
    let response = await apiHelper.sendGETRequest(APP_URL, orgApiEndPoint);
    validator.validateStatusCode(response, 200);
  });

  /*it("sending GET request with endpoint with parameter ownerId we should recieve status : 404 Not Found", async () => {
    let response = await apiHelper.sendGETRequest(
      APP_URL,
      orgApiEndPoint + "/" + ownerId,
    );
    validator.validateStatusCodeErrorAndMessage(
      response,
      404,
      "Not Found",
      "Not Found",
    );
  });*/
});
