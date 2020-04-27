const httpErrors = require("http-errors");
const mongoose = require("mongoose");

const {
  addCommentSchema,
  getPostsSchema,
  getPostByIdSchema,
  createPostSchema,
  deleteCommentSchema,
  deletePostSchema,
  likeUnlikeCommentSchema,
  likeUnlikePostSchema,
  updateCommentSchema,
  updatePostSchema,
} = require("./schema/posts");

/*
 * /api/posts
 */
async function routes(app) {
  const { mongo } = app;
  const Comment = mongo.model("Comment");
  const Post = mongo.model("Post");

  // /posts

  app.get("/", { schema: getPostsSchema }, async (req) => {
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
  });

  app.post(
    "/",
    { preValidation: [app.authenticate], schema: createPostSchema },
    async (req) => {
      return new Post({
        ...req.body,
        authorId: req.userId,
      }).save();
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
      const { params, userId } = req;
      const postId = mongoose.Types.ObjectId(params.postId);
      const { deletedCount, ok: deletePostOk } = await Post.deleteOne({
        _id: postId,
        authorId: userId,
      });
      if (deletePostOk !== 1) {
        return new httpErrors.InternalServerError();
      }
      if (deletedCount !== 1) {
        return new httpErrors.BadRequest();
      }
      const {
        deletedCount: deletedCommentsCount,
        ok: deleteCommentsOk,
      } = await Comment.deleteMany({ postId });
      if (deleteCommentsOk !== 1) {
        app.log.error("failed removing comments for deleted post", { postId });
      }
      return { deletedCommentsCount, deletedCount, success: true };
    },
  );

  app.patch(
    "/:postId",
    { preValidation: [app.authenticate], schema: updatePostSchema },
    async (req) => {
      const {
        body,
        params: { postId },
        userId,
      } = req;
      const post = await Post.findById(postId);
      if (post === null) {
        return new httpErrors.NotFound();
      }
      if (post.authorId !== userId) {
        return new httpErrors.Forbidden();
      }
      Object.keys(body).forEach((key) => {
        if (post[key] && post[key] !== body[key]) {
          post[key] = body[key];
        }
      });
      return post.save();
    },
  );

  app.post(
    "/:postId/comments",
    { preValidation: [app.authenticate], schema: addCommentSchema },
    async (req) => {
      const { body, params, userId } = req;
      const { parentId } = body;
      const { postId } = params;
      if (parentId) {
        const parentPost = await Post.findById(parentId);
        if (!parentPost || parentPost.postId !== postId) {
          return new httpErrors.BadRequest();
        }
      }
      return new Comment({
        ...body,
        authorId: userId,
        postId,
      }).save();
    },
  );

  app.put(
    "/:postId/comments/:commentId",
    { preValidation: [app.authenticate], schema: updateCommentSchema },
    async (req) => {
      const { body, params, userId } = req;
      const { comment } = body;
      const { commentId, postId } = params;
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, authorId: userId, postId },
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
      const { params, userId } = req;
      const { commentId, postId } = params;
      const { ok, deletedCount } = await Comment.deleteMany({
        $or: [
          { _id: commentId, authorId: userId, postId },
          { parentId: commentId, postId },
        ],
      });
      if (ok !== 1 || deletedCount < 1) {
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
      if (userId !== req.userId) {
        return new httpErrors.Forbidden();
      }
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
      if (userId !== req.userId) {
        return new httpErrors.Forbidden();
      }
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

  app.put(
    "/:postId/comments/:commentId/likes/:userId",
    { preValidation: [app.authenticate], schema: likeUnlikeCommentSchema },
    async (req) => {
      const { commentId, postId, userId } = req.params;
      if (userId !== req.userId) {
        return new httpErrors.Forbidden();
      }
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, likes: { $ne: userId }, postId },
        { $inc: { likesCount: 1 }, $push: { likes: userId } },
        { new: true },
      );
      if (!updatedComment) {
        return new httpErrors.BadRequest();
      }

      return {
        likes: updatedComment.likes,
        likesCount: updatedComment.likesCount,
      };
    },
  );

  app.delete(
    "/:postId/comments/:commentId/likes/:userId",
    { preValidation: [app.authenticate], schema: likeUnlikeCommentSchema },
    async (req) => {
      const {
        params: { commentId, postId },
        userId,
      } = req;
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, likes: userId, postId },
        { $inc: { likesCount: -1 }, $pull: { likes: userId } },
        { new: true },
      );
      if (!updatedComment) {
        return new httpErrors.BadRequest();
      }

      return {
        likes: updatedComment.likes,
        likesCount: updatedComment.likesCount,
      };
    },
  );
}

module.exports = routes;
