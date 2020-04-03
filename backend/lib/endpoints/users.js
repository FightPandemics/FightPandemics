const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { authSchema } = require("./schema/users");
const { config } = require("../../config");
const User = require("../models/User");

const router = express.Router();

/**
 * @route POST api/users/auth
 * @desc Allow Users to login/register
 * @access Public
 */
router.post("/auth", async (req, res) => {
  const { error, value: validatedData } = authSchema.validate(
    req.body,
    config.joi.params,
  );
  if (error) res.status(400).json(error);

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    user = new User({
      ...user,
      ...validatedData,
    });
    user.save();
  }

  // Create JWT Payload
  const payload = { id: user._id, email: user.email };

  // Sign Token
  return jwt.sign(payload, config.jwt.key, config.jwt.params, (err, token) => {
    if (err) {
      req.log.error(err);
      res.status(500).send(err);
    }
    res.json({
      success: true,
      token: `Bearer ${token}`,
    });
  });
});

/**
 * @route GET api/users
 * @desc Return current user
 * @access Private
 */
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      email: req.user.email,
    });
  },
);

module.exports = router;
