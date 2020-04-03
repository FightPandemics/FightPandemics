const express = require("express");
const passport = require("passport");
const { authSchema } = require("./schema/users");
const { config } = require("../../config");
const { createToken } = require("../components/Jwt");
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
  try {
    const token = await createToken(payload);
    return res.json({
      success: true,
      token: `Bearer ${token}`,
    });
  } catch (err) {
    req.log.error(err);
    return res.status(500).send(err);
  }
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
