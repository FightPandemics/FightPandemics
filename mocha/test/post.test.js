const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiHelper = require("../utils/apiHelper");
const apiEndPointHelper = require("../utils/apiEndpoints");
const validator = require("../utils/validators");
const testData = require("../utils/testData");
const mongoose = require("mongoose");
let apiPostEndPoint = apiEndPointHelper.postApiEndpoint;

describe("GET POST endpoint - for a user that is NOT signed in", function () {
  before(function (done) {
    mongoose.connect("mongodb://mongo/fightpandemics", function (error) {
      if (error) console.error("Error while connecting:\n%\n", error);
      console.log("connected");
      done(error);
    });
  });

  it("Success - user an get a post by ID", async function () {
    //   let response = await apiHelper.sendPOSTRequest(
    //     APP_URL,
    //     apiEndPoint,
    //     userCredentialsWithRandomEmailAndRandomPassword,
    //   );
    //   validator.validateStatusCodeErrorAndMessage(
    //     response,
    //     httpStatus.UNAUTHORIZED,
    //     "Unauthorized",
    //     "Wrong email or password.",
    //   );
    console.log("Get post test");
  });
});
