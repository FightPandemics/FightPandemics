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
        res.status(200).json(post);
      })
      .catch((err) => res.status(404).send(err));
  },
);

/**
 * @route POST api/likes/comment/:commentId
 * @desc Like a post
 * @access Protected
 */

router.post(
  "/comment/:commentId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Comment.findById(req.params.commentId)
      .then((comment) => {
        const newLike = new Like({
          likedBy: req.user.id,
          likedComment: comment._id,
        });
        newLike.save();
        comment.likes.push(newLike);
        comment.save();
        res.status(200).json(comment);
      })
      .catch((err) => res.status(404).send(err));
  },
);

module.exports = router;
