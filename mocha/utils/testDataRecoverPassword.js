const randomStringGenerator = require("../utils/randomStringGenerator");

exports.userCredentialsWithRandomEmail = {
    email : generateRandomEmail()
};

function generateRandomEmail(){
    return randomStringGenerator.randomString(8) + '.' + randomStringGenerator.randomString(8) + '@'  + randomStringGenerator.randomString(5) + '.com';
}