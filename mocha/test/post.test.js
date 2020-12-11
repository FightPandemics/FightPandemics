const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiHelper = require("../utils/apiHelper");
const apiEndPointHelper = require("../utils/apiEndpoints");
const validator = require("../utils/validators");
let getPostApiEndpoint = apiEndPointHelper.getPostApiEndpoint;
const dbHelper = require("../utils/dbHelper");
//const Post = require("../models/post");
const ObjectID = require("mongodb").ObjectID;
const authorID = new ObjectID();
const authorName = "Sourced by FightPandemics (Testers)";
let postID = 0;
let insertResult = [];

const post = {
  airtableId: "rec00UgojtQL4VGNw",
  author: {
    id: authorID,
    name: authorName,

    photo:
      "https://raw.githubusercontent.com/FightPandemics/FightPandemics/master/images/fp_logo.png",

    type: "Community",

    location: {
      address: "Portland, OR, USA",
      coordinates: [-122.6750261, 45.5051064],
      city: "Portland",
      state: "OR",
      country: "US",
    },
  },
  content:
    "Agnieszka his Mutual Aid Network is intended to distribute resources from local people to those who are vulnerable and in need in the area",
  // expireAt: dateInTwoWeeks,
  createdAt: new Date(),
  externalLinks: {
    website: "https://www.facebook.com/groups/1502826939890243/",
  },
  language: ["English"],
  likes: [],
  objective: "offer",
  title: "Agnieszka South FL Mutual Aid",
  types: ["Information"],
  updatedAt: new Date(),
  visibility: "worldwide",
};

describe("GET /api/posts/{postId} endpoint - for a user that is NOT signed in", function () {
  before(function () {
    console.log("BEFORE");
    dbHelper.connectToDatabase();
  });
  beforeEach(function (done) {
    console.log("BEFORE EACH");
    dbHelper.insertDocument(post, "posts").then((result) => {
      postID = result.insertedId;
      insertResult = result.ops;
      done();
    });
  });
  it.only("Success - user gets a post by ID", async function () {
    let response = await apiHelper.sendGETRequest(
      APP_URL,
      getPostApiEndpoint + "/" + postID,
    );
    validator.validateStatusCodeAndMessage(response, httpStatus.OK, 200);
    validator.validateInitialAndResponseObject(
      insertResult[0],
      ["author.location", "author.id", "createdAt", "updatedAt", "_id"],
      response.body.post,
      [
        "author.location",
        "author.id",
        "elapsedTimeText",
        "liked",
        "likesCount",
        "createdAt",
        "updatedAt",
        "_id",
      ],
    );
  });

  afterEach(function (done) {
    console.log("AFTER EACH");
    //delete record
    done();
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
