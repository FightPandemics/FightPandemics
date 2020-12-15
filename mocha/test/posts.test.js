const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiEndpoints = require("../utils/apiEndpoints");
const apiHelper = require("../utils/apiHelper");
const validator = require("../utils/validators");

let postsApiEndpoint = apiEndpoints.postsEndpoint;

describe("GET posts endpoint test", () => {
  it("send GET request to check that a list of posts exist in endpoint", async () => {
    let response = await apiHelper.sendGETRequest(APP_URL, postsApiEndpoint);
    validator.validateStatusCodeResponseBody(
      response,
      httpStatus.OK,
      "_id",
      "types",
    );
  });
});
