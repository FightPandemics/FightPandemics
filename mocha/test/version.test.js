const httpStatus= require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiEndPoints = require("../utils/apiEndpoints");
const apiHelper = require("../utils/apiHelper");
const validator = require("../utils/validators");
const testData = require("../utils/testData");

let apiEndPoint= apiEndPoints.versionApiEndpoint;

describe("Get Version endpoints test", function(){
    it("user enters to see version",async function(){
            let response= await apiHelper.sendPOSTRequest(
            APP_URL,
            apiEndPoint
    );
    validator.validateStatusCodeAndOk(
        response,
        200, 
        "fightpandemics",
        "1.0.0"
        
        );

     
    });

});