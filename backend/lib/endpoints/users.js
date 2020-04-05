const express = require("express");
const passport = require("passport");

const router = express.Router();

/**
 * @route GET api/users/current
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
