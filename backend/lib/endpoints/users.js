const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const pino = require("pino");
const { config } = require("../../config");

// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Import User Model
const User = require("../models/User");

/**
 * @route POST api/users/auth
 * @desc Allow Users to login/register
 * @access Public
 */
router.post("/auth", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    // console.log(email);
    let validateData;
    if (user) {
      validateData = validateLoginInput(req.body);
    } else {
      validateData = validateRegisterInput(req.body);

      if (validateData.isValid) {
        user = new User({
          ...req.body,
        });
        user.save();
      }
    }

    // Check Validation
    if (!validateData.isValid) {
      return res.status(400).json(validateData.errors);
    }

    // Create JWT Payload
    const payload = { id: user._id, email: user.email };

    // Sign Token
    jwt.sign(payload, config.jwt.key, config.jwt.params, (err, token) => {
      if (err) {
        pino.log(err);
        res.status(500).send(err);
      }
      res.json({
        success: true,
        token: `Bearer ${token}`,
      });
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
