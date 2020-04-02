const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  const errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  // data.accessToken = !isEmpty(data.accessToken) ? data.accessToken : "";

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // if (Validator.isEmpty(data.accessToken)) {
  //   errors.accessToken = "Access Token field is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
