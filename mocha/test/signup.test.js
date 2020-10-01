const httpStatus = require('http-status');
const APP_URL = process.env.MOCHA_URL;
const apiEndPoints = require('../utils/apiEndpoints');
const apiHelper = require('../utils/apiHelper');
const validator = require('../utils/validators');
const testData = require('../utils/testData');

let apiEndPoint = apiEndPoints.signUpApiEndpoint;
let userCredentialsWithMismatchedPassword = testData.userCredentialsWithMismatchedPassword;

let userCredentialsWithEmptyEmail = {}
Object.assign(userCredentialsWithEmptyEmail, testData.userCredentialsWithEmptyEmail)
Object.assign(userCredentialsWithEmptyEmail, { confirmPassword: userCredentialsWithEmptyEmail.password });

let userCredentialsWithInvalidEmailNoDomainSpecified = {}
Object.assign(userCredentialsWithInvalidEmailNoDomainSpecified, testData.userCredentialsWithInvalidEmailNoDomainSpecified)
Object.assign(userCredentialsWithInvalidEmailNoDomainSpecified, { confirmPassword: userCredentialsWithInvalidEmailNoDomainSpecified.password });

let userCredentialsWithEmailDomainExceeding64Characters = {}
Object.assign(userCredentialsWithEmailDomainExceeding64Characters, testData.userCredentialsWithEmailDomainExceeding64Characters)
Object.assign(userCredentialsWithEmailDomainExceeding64Characters, { confirmPassword: userCredentialsWithEmailDomainExceeding64Characters.password });

let userCredentialsWithEmailExceeding254Characters = {}
Object.assign(userCredentialsWithEmailExceeding254Characters, testData.userCredentialsWithEmailExceeding254Characters)
Object.assign(userCredentialsWithEmailExceeding254Characters, { confirmPassword: userCredentialsWithEmailExceeding254Characters.password });

let userCredentialsWithPasswordsNotMatched = {}
Object.assign(userCredentialsWithPasswordsNotMatched, testData.userCredentialsWithRandomEmailAndRandomPassword)
Object.assign(userCredentialsWithPasswordsNotMatched, { confirmPassword: userCredentialsWithMismatchedPassword.confirmPassword });

describe('POST Sign Up endpoint tests for unregistered user', () => {

    describe('User enters incorrect email data', () => {

        it('Empty email field triggers Bad Request error', async () => {
            let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentialsWithEmptyEmail);
            validator.validateStatusCodeErrorAndMessage(response, httpStatus.BAD_REQUEST, 'Bad Request', 'body.email should match format "email"');
        });

        it('Invalid email syntax triggers Bad Request error', async () => {
            let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentialsWithInvalidEmailNoDomainSpecified);
            validator.validateStatusCodeErrorAndMessage(response, httpStatus.BAD_REQUEST, 'Bad Request', 'body.email should match format "email"');
        });

        //Currently the backend API returns a 500 Internal Server error message. This needs to be corrected to return a 400 error message instead.
        it('Email local part has more than 64 characters triggers Internal Server error', async () => {
            let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentialsWithEmailDomainExceeding64Characters);
            validator.validateStatusCodeErrorAndMessage(response, httpStatus.BAD_REQUEST, 'Bad Request', 'body.email should match format "email"');
        });

        it('Email domain part has more than 189 characters. Total bigger than 254 characters triggers Bad Request error', async () => {
            let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentialsWithEmailExceeding254Characters);
            validator.validateStatusCodeErrorAndMessage(response, httpStatus.BAD_REQUEST, 'Bad Request', 'body.email should match format "email"');
        });

    });

    describe('User enters incorrect password data', () => {

        it('Mismatched password and confirm password triggers Bad Request error', async () => {
            let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentialsWithPasswordsNotMatched);
            validator.validateStatusCodeErrorAndMessage(response, httpStatus.BAD_REQUEST, 'Bad Request', 'Password should be entered twice exactly the same');
        });

    });

});