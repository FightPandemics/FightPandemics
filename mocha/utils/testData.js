const randomStringGenerator = require("../utils/randomStringGenerator");

exports.userCredentialsWithRandomEmailAndRandomPassword = {
    email : generateRandomEmail(),
    password :generateRandomPassword(),
};

exports.userCredentialsWithRandomEmail = {
    email : generateRandomEmail(),
    password :'AbcTest123;',
};

exports.userCredentialsWithEmptyEmail = {
    email : '',
    password :generateRandomPassword(),
};

exports.userCredentialsWithEmptyPassword = {
    email : generateRandomEmail(),
    password :'',
};

exports.userCredentialsWithInvalidEmailNoDomainSpecified = {
    email : generateInvalidRandomEmail(),
    password : generateRandomPassword(),
}

exports.userCredentialsWithInvalidPassword = {
    email : generateRandomEmail(),
    password : 'abc',
}

exports.userCredentialsWithEmailDomainExeeding64Characters = {
    email : generateEmailDomainExeeding64Characters(),
    password : generateRandomPassword(),
}

exports.userCredentialsWithEmailExeeding254Characters = {
    email : generateEmailExeeding254Characters(),
    password : generateRandomPassword(),
}

function generateRandomEmail(){
    return randomStringGenerator.randomString(8) + '.' + randomStringGenerator.randomString(8) + '@'  + randomStringGenerator.randomString(5) + '.com';
}

function generateInvalidRandomEmail(){
    return randomStringGenerator.randomString(8) + '.' + randomStringGenerator.randomString(8) + '@';
}
function generateRandomPassword(){
    return randomStringGenerator.randomString(8) + '.;';
}

function generateEmailDomainExeeding64Characters(){
    //following the rules that Auth0 are using the email needs to have 64max for the local part and an overall max of 254 chars
    return randomStringGenerator.randomString(100) + '@'  + randomStringGenerator.randomString(5) + '.com';
}

function generateEmailExeeding254Characters(){
    //following the rules that Auth0 are using the email needs to have 64max for the local part and an overall max of 254 chars
    return randomStringGenerator.randomString(64) + '@'  + randomStringGenerator.randomString(200) + '.com';
}