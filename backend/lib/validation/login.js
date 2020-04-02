const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  // data.accessToken = !isEmpty(data.accessToken) ? data.accessToken : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is required";
  }

  // if (Validator.isEmpty(data.accessToken)) {
  //   errors.accessToken = "Access Token Field is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
