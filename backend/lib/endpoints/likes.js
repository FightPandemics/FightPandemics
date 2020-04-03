const express = require("express");
const passport = require("passport");
const router = express.Router();

const Like = require("../models/Like");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

/**
 * @route POST api/likes/post/:postId
 * @desc Like a post
 * @access Protected
 */

router.post(
  "/post/:postId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.postId)
      .then((post) => {
        const newLike = new Like({
          likedBy: req.user.id,
          likedPost: post._id,
        });
        newLike.save();
        post.likes.push(newLike);
        post.save();
        res.status(200).json(post.likes);
      })
      .catch((err) => res.status(404).send(err));
  },
);


module.exports = router;
