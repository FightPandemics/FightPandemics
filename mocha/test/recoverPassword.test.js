const httpStatus = require('http-status');
const APP_URL = process.env.MOCHA_URL 
const apiHelper = require("../utils/apiHelper");
const apiEndPointHelper = require('../utils/apiEndpoints');
const validator = require('../utils/validators');
const testData = require('../utils/testDataRecoverPassword')
let apiEndPoint = apiEndPointHelper.recoverPasswordApiEndpoint;
let userCredentialsWithRandomEmail = testData.userCredentialsWithRandomEmail;


describe('POST Recover password endpoint tests', function () {

    describe('200 email was sent', function () {

        it('User gets message when operation was successful', async function () {
            let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentialsWithRandomEmail);
            console.log(response);
            validator.validateBody(response, 'email', userCredentialsWithRandomEmail.email, 'responseMessage', 'We\'ve just sent you an email to reset your password.');
        });
    
    });

});