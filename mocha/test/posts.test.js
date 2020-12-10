const httpStatus = require("http-status");
const APP_URL = process.env.MOCHA_URL;
const apiEndpoints = require("../utils/apiEndpoints");
const apiHelper = require("../utils/apiHelper");
const validator = require("../utils/validators");

let apiEndpoint = apiEndpoints.postsEndpoint;
