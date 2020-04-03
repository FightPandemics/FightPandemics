const Joi = require("@hapi/joi");

// {
//   connection: "Username-Password-Authentication",
//   email: "john.doe@gmail.com",
//   password: "Password123!",
//   user_metadata: {
//     name: "John",
//     surname: "Doe",
//   },
//   email_verified: false,
//   verify_email: false,
//   app_metadata: {},
// };

const signUpSchema = Joi.object().keys({
  connection: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  user_metadata: Joi.object().keys({
    name: Joi.string(),
    surname: Joi.string(),
  }),
  email_verified: Joi.boolean(),
  verify_email: Joi.boolean(),
});

module.exports = {
  signUpSchema,
};
