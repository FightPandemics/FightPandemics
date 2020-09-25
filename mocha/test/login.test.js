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


    it('Unauthorized error - when trying to log in with the wrong credentials', async function () {
        let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, credentialsWithWrongPassword);
        validator.validateStatusCodeErrorAndMessage(response, httpStatus.UNAUTHORIZED, 'Unauthorized', 'Wrong email or password.');
    });

    it('Too Many Requests error - when maximum sign in attempts are exceeded', async function () {
        let response ;
        for (var i = 0; i < 11; i++) {
            response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, credentialsWithWrongPassword);
    };
        validator.validateStatusCodeErrorAndMessage(response, httpStatus.TOO_MANY_REQUESTS, 'Too Many Requests', 'Maximum number of sign in attempts exceeded.');
    });
   

});

function generateRandomEmail(){
    return randomStringGenerator.randomString(8) + '.' + randomStringGenerator.randomString(8) + '@'  + randomStringGenerator.randomString(5) + '.com';
}