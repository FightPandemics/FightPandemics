// const auth = require("../externals/auth");
const { config } = require("../../config");
const { signUpSchema } = require("./schema/signup");

const signUp = async (req, res) => {
  const { value: payload, error } = signUpSchema.validate(
    req.body,
    config.joi.params,
  );
  if (error) res.status(400).json(error);
  return res.json(payload);
};

module.exports = signUp;
