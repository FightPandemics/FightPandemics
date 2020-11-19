const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiHelper = require("../utils/apiHelper");
const apiEndPointHelper = require("../utils/apiEndpoints");
const validator = require("../utils/validators");
const testData = require("../utils/testData");
let getPostApiEndpoint = apiEndPointHelper.getPostApiEndpoint;
const dbHelper = require("../utils/dbHelper");

describe("GET /api/posts/{postId} endpoint - for a user that is NOT signed in", function () {
  before(function () {
    console.log("BEFORE");
    dbHelper.connectToDatabase();
  });
  it("Success - user gets a post by ID", async function () {
    var posts = dbHelper.findDocuments();
    var firstPostId = (await posts)[0]._id;
    let response = await apiHelper.sendGETRequest(
      APP_URL,
      getPostApiEndpoint + firstPostId,
    );
    validator.validateStatusCodeAndMessage(
      response,
      httpStatus.OK,
      200,
      firstPostId,
    );
  });
  after(function () {
    console.log("AFTER");
    dbHelper.disconnect();
  });
});
