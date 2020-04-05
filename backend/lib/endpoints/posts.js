const express = require("express");
const passport = require("passport");
const router = express.Router();

const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like");

/**
 * @route GET api/posts/
 * @desc Get all posts from the newest to oldest
 * @access Public
 */

router.get("/", async (req, res) => {
  try {
    const sortedPosts = await Post.find().sort({ date: -1 });
    res.status(200).json(sortedPosts);
  } catch (error) {
    res.status(404).send(error);
  }
});

/**
 * @route GET api/posts/:postId
 * @desc Get a post by post id
 * @access Public
 */

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).send(error);
  }
});

/**
 * @route GET api/posts/user/:authorId
 * @desc Get all posts of a user
 * @access Public
 */

router.get("/user/:authorId", async (req, res) => {
  try {
    const sortedPosts = await Post.find({ authorId: req.params.authorId }).sort(
      {
        date: -1,
      },
    );
    res.status(200).json(sortedPosts);
  } catch (error) {
    res.status(404).send(error);
  }
});

/**
 * @route POST api/posts/
 * @desc Create a post
 * @access Protected
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      req.body.authorId = req.user.id;
      const newPost = await new Post(req.body).save();
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

/**
 * @route POST api/posts/:postId/comment
 * @desc Create a comment by post id
 * @access Protected
 */
router.post(
  "/:postId/comment",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const postId = req.params.postId;
      req.body.authorId = req.user.id;
      req.body.postId = postId;
      const newComment = await new Comment(req.body).save();
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: newComment } },
        { new: true },
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

/**
 * @route POST api/posts/:postId/like
 * @desc Like/Unlike a post once
 * @access Protected
 */
router.post(
  "/:postId/like",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const postId = req.params.postId;
      const data = { userId: req.user.id, postId };
      const like = await Like.findOne(data);
      let updatedPost;

      if (!like) {
        const newLike = await new Like(data).save();
        updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { likes: newLike._id } },
          { new: true },
        );
      } else {
        const removeLike = await Like.findByIdAndRemove(like._id);
        updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { likes: like._id } },
          { new: true },
        );
      }
      res.json(updatedPost);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

/**
 * @route PATCH api/posts/:postId
 * @desc Update a post by post id
 * @access Protected
 */
router.patch(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      for (let key in req.body) {
        if (post[key] && post[key] !== req.body[key]) {
          post[key] = req.body[key];
        }
      }
      post.save();
      res.status(200).json(post);
    } catch (error) {
      res.status(404).send(error);
    }
  },
);

/**
 * @route DELETE api/posts/:postId
 * @desc Delete a post by post id
 * @access Protected
 */
router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const removedPost = await Post.findByIdAndRemove(req.params.postId);
      res.status(200).json(removedPost);
    } catch (error) {
      res.status(404).send(error); // not sure why error is {} here
    }
  },
);
module.exports = router;
