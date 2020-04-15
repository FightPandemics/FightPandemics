const httpErrors = require("http-errors");
const mongoose = require("mongoose");

const {
  getPostsSchema,
  getPostByIdSchema,
  createPostSchema,
  deleteCommentSchema,
  deletePostSchema,
  likeUnlikePostSchema,
  updateCommentSchema,
  updatePostSchema,
  addCommentSchema,
} = require("./schema/posts");

/*
 * /api/posts
 */
async function routes(app) {
  const { mongo } = app;
  const Comment = mongo.model("Comment");
  const Post = mongo.model("Post");

  // /posts

  app.get(
    "/",
    { preValidation: [app.authenticate], schema: getPostsSchema },
    async (req) => {
      // todo: add limit, skip, visibility filter, needs, tags ...
      const { authorId } = req.params;
      const aggregates = authorId ? [{ $match: { authorId } }] : [];
      aggregates.push(
        {
          $lookup: {
            as: "comments",
            foreignField: "postId",
            from: "comments",
            localField: "_id",
          },
        },
        {
          $project: {
            _id: true,
            commentsCount: {
              $size: "$comments",
            },
            description: true,
            likesCount: true,
            shareWith: true,
            tags: true,
            title: true,
          },
        },
      );
      return Post.aggregate(aggregates);
    },
  );

  app.post(
    "/",
    { preValidation: [app.authenticate], schema: createPostSchema },
    async (req) => {
      // todo add logged in user from jwt
      req.body.authorId = ""; // req.user.id;
      return new Post(req.body).save();
    },
  );

  // /posts/postId

  app.get(
    "/:postId",
    { preValidation: [app.authenticate], schema: getPostByIdSchema },
    async (req, reply) => {
      const { postId } = req.params;
      const post = await Post.findById(postId);
      if (post === null) {
        return reply.send(new httpErrors.NotFound());
      }
      post.comments = await Comment.aggregate([
        {
          $match: {
            parentId: null,
            postId: mongoose.Types.ObjectId(postId),
          },
        },
        {
          $lookup: {
            as: "children",
            foreignField: "parentId",
            from: "comments",
            localField: "_id",
          },
        },
        {
          $addFields: {
            childCount: {
              $size: "$children",
            },
          },
        },
      ]);
      // todo: find a better way to return this from the comments aggregate
      post.commentsCount = await Comment.find({ postId }).count();
      return post;
    },
  );

  app.delete(
    "/:postId",
    { preValidation: [app.authenticate], schema: deletePostSchema },
    async (req) => {
      // todo: make sure user can only delete their own posts
      return Post.findByIdAndRemove(req.params.postId);
    },
  );

  app.patch(
    "/:postId",
    { preValidation: [app.authenticate], schema: updatePostSchema },
    async (req, reply) => {
      // todo: make sure user can only update their own post
      const post = await Post.findById(req.params.postId);
      if (post === null) {
        return reply.send(new httpErrors.NotFound());
      }
      Object.keys(req.body).forEach((key) => {
        if (post[key] && post[key] !== req.body[key]) {
          post[key] = req.body[key];
        }
      });
      return post.save();
    },
  );

  app.post(
    "/:postId/comments",
    { preValidation: [app.authenticate], schema: addCommentSchema },
    async (req) => {
      const { body, params } = req;
      const { parentId } = body;
      const { postId } = params;
      // todo: get user id from JWT
      //  check if user is authorized to comment (depending on visibility for that post)
      if (parentId) {
        const parentPost = await Post.findById(parentId);
        if (!parentPost || parentPost.postId !== postId) {
          return new httpErrors.BadRequest();
        }
      }
      const commentProps = {
        ...body,
        authorId: "", // req.user.id
        postId,
      };
      return new Comment(commentProps).save();
    },
  );

  app.put(
    "/:postId/comments/:commentId",
    { preValidation: [app.authenticate], schema: updateCommentSchema },
    async (req) => {
      const { body, params, user } = req;
      const { comment } = body;
      const { commentId, postId } = params;
      // todo: get user id from JWT
      //  check if user is authorized to edit comment (only your own comment, visibility can change?)
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, authorId: user.id, postId },
        { comment },
        { new: true },
      );
      if (!updatedComment) {
        return new httpErrors.BadRequest();
      }
      return updatedComment;
    },
  );

  app.delete(
    "/:postId/comments/:commentId",
    { preValidation: [app.authenticate], schema: deleteCommentSchema },
    async (req) => {
      const { body, params, user } = req;
      const { comment } = body;
      const { commentId, postId } = params;
      // todo: get user id from JWT
      //  check if user is authorized to delete their own comment (visibility can change?)
      //  + also delete all sub comments?
      const { ok, deletedCount } = await Comment.deleteOne(
        { _id: commentId, authorId: user.id, postId },
        { comment },
        { new: true },
      );
      if (ok !== 1 || deletedCount !== 1) {
        return new httpErrors.BadRequest();
      }
      return { deletedCount, success: true };
    },
  );

  app.put(
    "/:postId/likes/:userId",
    { preValidation: [app.authenticate], schema: likeUnlikePostSchema },
    async (req) => {
      const { postId, userId } = req.params;
      // todo: get user id from JWT
      //  check if userId is the same as param, and if authorized to like (based on visibility)
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId, likes: { $ne: userId } },
        { $inc: { likesCount: 1 }, $push: { likes: userId } },
        { new: true },
      );
      if (!updatedPost) {
        return new httpErrors.BadRequest();
      }

      return {
        likes: updatedPost.likes,
        likesCount: updatedPost.likesCount,
      };
    },
  );

  app.delete(
    "/:postId/likes/:userId",
    { preValidation: [app.authenticate], schema: likeUnlikePostSchema },
    async (req) => {
      const { postId, userId } = req.params;
      // todo: get user id from JWT
      //  check if userId is the same as param, and if authorized to like (based on visibility)
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId, likes: userId },
        { $inc: { likesCount: -1 }, $pull: { likes: userId } },
        { new: true },
      );
      if (!updatedPost) {
        return new httpErrors.BadRequest();
      }

      return {
        likes: updatedPost.likes,
        likesCount: updatedPost.likesCount,
      };
    },
  );
}

module.exports = routes;
