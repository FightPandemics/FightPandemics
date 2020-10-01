const { expect } = require('chai');

exports.validateStatusCodeErrorAndMessage = function (response, statusCode, error, message) {
    expect(response.body).to.have.a.property('statusCode').to.be.equal(statusCode);
    expect(response.body).to.have.a.property('error').to.be.equal(error);
    expect(response.body).to.have.a.property('message').to.be.equal(message);
};

exports.validateBody = function (response, bodyProperty, body, messageProperty, message) {
    expect(response.body).to.have.a.property('' + bodyProperty + '').to.be.equal(body);
    expect(response.body).to.have.a.property('' + messageProperty + '').to.be.equal(message);
};