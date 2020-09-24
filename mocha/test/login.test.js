const httpStatus = require('http-status');
const APP_URL = process.env.MOCHA_URL 
const randomStringGenerator = require("../utils/randomStringGenerator");
const apiHelper = require("../utils/apiHelper");
const apiEndPointHelper = require('../utils/apiEndpoints');
const validator = require('../utils/validators');

let apiEndPoint = apiEndPointHelper.loginApiEndpoint;

describe('POST Login', function () {
    let credentialsWithWrongPassword = {
        email: '',
        password: 'Test1234;'
      };

    before(async function () {
        credentialsWithWrongPassword.email = generateRandomEmail();
    });


    it('User is not able to log in with the wrong credentials', async function () {
        let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, credentialsWithWrongPassword);
        validator.validateStatusCodeErrorAndMessage(response, httpStatus.UNAUTHORIZED, 'Unauthorized', 'Wrong email or password.');
    });

});

function generateRandomEmail(){
    return randomStringGenerator.randomString(8) + '.' + randomStringGenerator.randomString(8) + '@'  + randomStringGenerator.randomString(5) + '.com';
}