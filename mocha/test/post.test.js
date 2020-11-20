const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiHelper = require("../utils/apiHelper");
const apiEndPointHelper = require("../utils/apiEndpoints");
const validator = require("../utils/validators");
let getPostApiEndpoint = apiEndPointHelper.getPostApiEndpoint;
const dbHelper = require("../utils/dbHelper");
const Post = require("../models/post");
var ObjectID = require("mongodb").ObjectID;

describe("GET /api/posts/{postId} endpoint - for a user that is NOT signed in", function () {
  before(function () {
    console.log("BEFORE");
    dbHelper.connectToDatabase();
  });
  it("Success - user gets a post by ID", async function () {
    var authorRegex = new RegExp("Sourced by FightPandemics", "i");
    var post = await dbHelper.findOneDocumentWithCondition(Post, {
      "author.name": authorRegex,
    });
    var postId = post._id;
    let response = await apiHelper.sendGETRequest(
      APP_URL,
      getPostApiEndpoint + "/" + postId,
    );
    validator.validateStatusCodeAndMessage(response, httpStatus.OK, 200);
  });

  it("404 error - post was not found by random mongodb ObjectID", async function () {
    var objectId = new ObjectID();
    let response = await apiHelper.sendGETRequest(
      APP_URL,
      getPostApiEndpoint + "/" + objectId,
    );
    validator.validateStatusCodeErrorAndMessage(
      response,
      httpStatus.NOT_FOUND,
      "Not Found",
      "Not Found",
    );
  });
  after(function () {
    console.log("AFTER");
    dbHelper.disconnect();
  });
});
