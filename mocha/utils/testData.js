const randomStringGenerator = require("../utils/randomStringGenerator");

exports.userCredentialsWithRandomEmailAndRandomPassword = {
    email: generateRandomEmail(),
    password: generateRandomPassword(),
};

exports.userCredentialsWithRandomEmail = {
    email: generateRandomEmail(),
    password: 'AbcTest123;',
};

exports.userCredentialsWithEmptyEmail = {
    email: '',
    password: generateRandomPassword(),
};

exports.userCredentialsWithEmptyPassword = {
    email: generateRandomEmail(),
    password: '',
};

exports.userCredentialsWithInvalidEmailNoDomainSpecified = {
    email: generateInvalidRandomEmail(),
    password: generateRandomPassword(),
}

exports.userCredentialsWithInvalidPassword = {
    email: generateRandomEmail(),
    password: 'abc',
}

exports.userCredentialsWithEmailLocalExceeding64Characters = {
    email: generateEmailLocalExceeding64Characters(),
    password: generateRandomPassword(),
}

exports.userCredentialsWithEmailDomainExceeding63Characters = {
    email: generateEmailDomainExceeding63Characters(),
    password: generateRandomPassword(),
}

exports.userCredentialsWithEmailInvalidTopLevelDomain = {
    email: generateEmailInvalidTopLevelDomain(),
    password: generateRandomPassword(),
}

exports.userCredentialsWithMismatchedPassword = {
    confirmPassword: 'Password'
}


function generateRandomEmail() {
    return randomStringGenerator.randomString(8) + '.' + randomStringGenerator.randomString(8) + '@' + randomStringGenerator.randomString(5) + '.com';
}

function generateInvalidRandomEmail() {
    return randomStringGenerator.randomString(8) + '.' + randomStringGenerator.randomString(8) + '@';
}

function generateRandomPassword() {
    return randomStringGenerator.randomString(8) + '.;';
}

function generateEmailLocalExceeding64Characters() {
    //following the rules that Auth0 are using the email needs to have 64max for the local part, 63max for the domain part, and an overall max of 254 chars
    return randomStringGenerator.randomString(100) + '@' + randomStringGenerator.randomString(5) + '.com';
}

function generateEmailDomainExceeding63Characters() {
    //following the rules that Auth0 are using the email needs to have 64max for the local part, 63max for the domain part, and an overall max of 254 chars
    return randomStringGenerator.randomString(64) + '@' + randomStringGenerator.randomString(65) + '.com';
}

function generateEmailInvalidTopLevelDomain() {
    //following the rules that Auth0 are using the email needs to have 64max for the local part, 63max for the domain part, and an overall max of 254 chars
    return randomStringGenerator.randomString(64) + '@' + randomStringGenerator.randomString(63) + '.' + randomStringGenerator.randomString(150);
}

