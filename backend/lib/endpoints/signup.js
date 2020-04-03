const Auth0 = require("../components/Auth0");
const { config } = require("../../config");
const { signUpSchema } = require("./schema/signup");

const signUp = async (req, res) => {
  const { value: payload, error } = signUpSchema.validate(
    req.body,
    config.joi.params,
  );
  if (error) res.status(400).json(error);

  if (!req.header.token) {
    res.status(500).send({ message: "Failed to authenticate the user.." });
  }

  const response = await Auth0.createUser(req.header.token, payload);
  return res.status(response.statusCode).json(response);
};

module.exports = signUp;
