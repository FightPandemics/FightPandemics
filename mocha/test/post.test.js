const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiHelper = require("../utils/apiHelper");
const apiEndPointHelper = require("../utils/apiEndpoints");
const validator = require("../utils/validators");
const testData = require("../utils/testData");
let apiPostEndPoint = apiEndPointHelper.postApiEndpoint;
const dbHelper = require("../utils/dbHelper");

describe("GET POST endpoint - for a user that is NOT signed in", function () {
  before(function () {
    console.log("BEFORE");
    dbHelper.connectToDatabase();
  });
  it("Success - user an get a post by ID", async function () {
    dbHelper.retrivePostFromDb().then((posts) => {
      console.log("test posts " + posts.length);
    });
  });
  after(function () {
    console.log("AFTER");
    dbHelper.disconnect();
  });
});
