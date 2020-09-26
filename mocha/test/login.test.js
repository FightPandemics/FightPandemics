const httpStatus = require('http-status');
const APP_URL = process.env.MOCHA_URL 
const randomStringGenerator = require("../utils/randomStringGenerator");
const apiHelper = require("../utils/apiHelper");
const apiEndPointHelper = require('../utils/apiEndpoints');
const validator = require('../utils/validators');

let apiEndPoint = apiEndPointHelper.loginApiEndpoint;

describe('POST Login unauthorized and maximum sign in attempts', function () {
    let userCredentials;

    beforeEach(async function () {
        userCredentials = {
            email : generateRandomEmail(),
            password :generateRandomPassword(),
        }

    });


    it('Unauthorized error - when trying to log in with the wrong credentials', async function () {
        let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentials);
        validator.validateStatusCodeErrorAndMessage(response, httpStatus.UNAUTHORIZED, 'Unauthorized', 'Wrong email or password.');
    });

    it('Too Many Requests error - when maximum sign in attempts are exceeded', async function () {
        let response ;
        for (var i = 0; i < 11; i++) {
            response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentials);
    };
        validator.validateStatusCodeErrorAndMessage(response, httpStatus.TOO_MANY_REQUESTS, 'Too Many Requests', 'Maximum number of sign in attempts exceeded.');
    });   
});

describe('POST Login with empty email', function () {
    let userCredentials;

    before(async function () {
        userCredentials = {
            email : '',
            password :generateRandomPassword(),
        }

    });

    it('Empty email triggers Bad Request error', async function () {
        let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentials);
        validator.validateStatusCodeErrorAndMessage(response, httpStatus.BAD_REQUEST, 'Bad Request', 'body.email should match format "email"');
    });  
});

describe('POST Login with empty password', function () {

    let userCredentials;

    before(async function () {
        userCredentials = {
            email : generateRandomEmail(),
            password : '',
        }

    });

    it('Empty password triggers Internal Server Error error', async function () {
        let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentials);
        validator.validateStatusCodeErrorAndMessage(response, httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', 'Internal Server Error');
    });  
});

describe('POST Login with invalid email', function () {
 
    let userCredentials;

    before(async function () {
        userCredentials = {
            email : generateInvalidRandomEmail(),
            password : generateRandomPassword(),
        }

    });

    it('Invalid email triggers Internal Server Error error', async function () {
        let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentials);
        validator.validateStatusCodeErrorAndMessage(response, httpStatus.BAD_REQUEST, 'Bad Request', 'body.email should match format "email"');
    });
});

function generateRandomEmail(){
    return randomStringGenerator.randomString(8) + '.' + randomStringGenerator.randomString(8) + '@'  + randomStringGenerator.randomString(5) + '.com';
}

function generateInvalidRandomEmail(){
    return randomStringGenerator.randomString(8) + '.' + randomStringGenerator.randomString(8) + '@';
}
function generateRandomPassword(){
    return randomStringGenerator.randomString(8) + '.;';
}