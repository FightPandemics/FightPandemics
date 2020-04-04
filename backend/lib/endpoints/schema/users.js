const Joi = require("@hapi/joi");

const authSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

module.exports = {
  authSchema,
};
