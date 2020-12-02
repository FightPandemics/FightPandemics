const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiEndPoints = require("../utils/apiEndpoints");
const apiHelper = require("../utils/apiHelper");
const validator = require("../utils/validators");

let orgApiEndPoint = apiEndPoints.organisationsEndpoint;
let orgId = "5fc7aa97c0cdcc003855f308";
let invalidId = "5fba8756dd5c260038d223a3";
let ownerId = "5fc7aa97c0cdcc003855f304";

describe("GET organisations endpoint tests", () => {
  it("sending GET request with endpoint, status : 200 OK with org details", async () => {
    let response = await apiHelper.sendGETRequest(APP_URL, orgApiEndPoint);
    validator.validateStatusCode(response, 200);
  });

  it("sending GET request with endpoint with valid path parameter id, status : 200 OK with details", async () => {
    //var org = JSON.parse(responseBody);
    //let orgId = org[1]._id;
    //let orgId = "5fba8756dd5c260038d223b2";
    let response = await apiHelper.sendGETRequest(
      APP_URL,
      orgApiEndPoint + "/" + orgId,
    );
    validator.validateStatusBody(
      response,
      200,
      "5fc7aa97c0cdcc003855f308",
      "5fc7aa97c0cdcc003855f304",
      "Community",
    );
  });

  it("sending GET request with endpoint with a invalid path parameter we should recieve status : 404 Not Found", async () => {
    let response = await apiHelper.sendGETRequest(
      APP_URL,
      orgApiEndPoint + "/" + invalidId,
    );
    validator.validateStatusCodeErrorAndMessage(
      response,
      404,
      "Not Found",
      "Not Found",
    );
  });

  it("sending GET request with endpoint with parameter ownerId we should recieve status : 404 Not Found", async () => {
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
  });

  /* it("sending GET request with endpoint with parameter university, status : 500 internal server error", async () => {
    let response = await apiHelper.sendGETRequest(APP_URL, orgApiEndPoint);
    validator.validateStatusCodeErrorAndMessage(
      response,
      500,
      INTERNAL_SERVER_ERROR,
      'Cast to ObjectId failed for value "University" at path "_id" for model "OrganisationUser"',
    );
  });*/
});
