const httpStatus = require('http-status');
const APP_URL = process.env.MOCHA_URL;
const apiEndPoints = require('../utils/apiEndpoints');
const apiHelper = require('../utils/apiHelper');
const validator = require('../utils/validators');
const testData = require('../utils/testData');

let apiEndPoint = apiEndPoints.signUpApiEndpoint;

let userCredentialsWithEmptyEmail = {}
Object.assign(userCredentialsWithEmptyEmail, testData.userCredentialsWithEmptyEmail)
Object.assign(userCredentialsWithEmptyEmail, { confirmPassword: userCredentialsWithEmptyEmail.password });

let userCredentialsWithInvalidEmailNoDomainSpecified = {}
Object.assign(userCredentialsWithInvalidEmailNoDomainSpecified, testData.userCredentialsWithInvalidEmailNoDomainSpecified)
Object.assign(userCredentialsWithInvalidEmailNoDomainSpecified, { confirmPassword: userCredentialsWithInvalidEmailNoDomainSpecified.password });

let userCredentialsWithEmailLocalExceeding64Characters = {}
Object.assign(userCredentialsWithEmailLocalExceeding64Characters, testData.userCredentialsWithEmailLocalExceeding64Characters)
Object.assign(userCredentialsWithEmailLocalExceeding64Characters, { confirmPassword: userCredentialsWithEmailLocalExceeding64Characters.password });

let userCredentialsWithEmailDomainExceeding63Characters = {}
Object.assign(userCredentialsWithEmailDomainExceeding63Characters, testData.userCredentialsWithEmailDomainExceeding63Characters)
Object.assign(userCredentialsWithEmailDomainExceeding63Characters, { confirmPassword: userCredentialsWithEmailDomainExceeding63Characters.password });

let userCredentialsWithEmailInvalidTopLevelDomain = {}
Object.assign(userCredentialsWithEmailInvalidTopLevelDomain, testData.userCredentialsWithEmailInvalidTopLevelDomain)
Object.assign(userCredentialsWithEmailInvalidTopLevelDomain, { confirmPassword: userCredentialsWithEmailInvalidTopLevelDomain.password });

let userCredentialsWithPasswordsNotMatched = {}
Object.assign(userCredentialsWithPasswordsNotMatched, testData.userCredentialsWithRandomEmailAndRandomPassword)
Object.assign(userCredentialsWithPasswordsNotMatched, { confirmPassword: testData.userCredentialsWithMismatchedPassword.confirmPassword });

let userCredentialsWithEmptyPasswords = {}
Object.assign(userCredentialsWithEmptyPasswords, testData.userCredentialsWithEmptyPassword)
Object.assign(userCredentialsWithEmptyPasswords, { confirmPassword: userCredentialsWithEmptyPasswords.password });


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

        //Currently the backend API returns a 500 Internal Server error message. This needs to be corrected to return a 400 error message instead. An issue ticket has been submitted.
        it('Email local part has more than 64 characters triggers Bad Request error', async () => {
            let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentialsWithEmailLocalExceeding64Characters);
            validator.validateStatusCodeErrorAndMessage(response, httpStatus.BAD_REQUEST, 'Bad Request', 'body.email should match format "email"');
        });

        it('Email domain part has more than 63 characters triggers Bad Request error', async () => {
            let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentialsWithEmailDomainExceeding63Characters);
            validator.validateStatusCodeErrorAndMessage(response, httpStatus.BAD_REQUEST, 'Bad Request', 'body.email should match format "email"');
        });

        it('Email invalid top level domain triggers Bad Request error', async () => {
            let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentialsWithEmailInvalidTopLevelDomain);
            validator.validateStatusCodeErrorAndMessage(response, httpStatus.BAD_REQUEST, 'Bad Request', 'body.email should match format "email"');
        });

    });

    describe('User enters incorrect password data', () => {

        it('Mismatched password and confirm password trigger Bad Request error', async () => {
            let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentialsWithPasswordsNotMatched);
            validator.validateStatusCodeErrorAndMessage(response, httpStatus.BAD_REQUEST, 'Bad Request', 'PasswordsShouldMatch');
        });

        //Currently the backend API returns a 500 Internal Server error message. This needs to be corrected to return a 400 error message instead. An issue ticket has been submitted.
        it('Empty password and confirm password trigger Bad Request error', async () => {
            let response = await apiHelper.sendPOSTRequest(APP_URL, apiEndPoint, userCredentialsWithEmptyPasswords);
            validator.validateStatusCodeErrorAndMessage(response, httpStatus.BAD_REQUEST, 'Bad Request', 'Passwords should be populated.');
        });


    });

});