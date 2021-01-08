const { expect } = require("chai");
const _ = require("lodash");

exports.validateResponseBody = function (response, key1, key2) {
  expect(
    response.body.forEach((object) => {
      expect(object).to.have.a.property(key1);
      expect(object).to.have.a.property(key2);
    }),
  );
};

exports.validateResponse = function (response, dict) {
  for (var key in dict) {
    var value = dict[key];
    expect(response).to.have.a.property(key).to.be.equal(value);
  }
};

exports.validateInitialAndResponseObject = function (
  initial,
  initialPropToOmit,
  response,
  responsePropToOmit,
) {
  var result = _.isEqual(
    _.omit(initial, initialPropToOmit),
    _.omit(response, responsePropToOmit),
  );
  expect(result).to.be.equal(true);
};
