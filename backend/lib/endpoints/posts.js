const mongoose = require("mongoose");
const moment = require("moment");

const {
  createCommentSchema,
  getCommentsSchema,
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
  const User = mongo.model("User");

  // /posts
  const UNLOGGED_POST_SIZE = 120;

  app.get(
    "/",
    {
      preValidation: [app.authenticate],
      schema: getPostsSchema,
    },
    async (req) => {
      const { userId } = req.query;
      const [userErr, user] = await app.to(User.findById(userId));
      if (userErr) {
        throw app.httpErrors.notFound();
      }

      // Base filters - expiration and visibility
      /* eslint-disable sort-keys */
      const filters = [
        { $or: [{ expireAt: null }, { expireAt: { $gt: new Date() } }] },
        {
          $or: [
            { visibility: "worldwide" },
            {
              visibility: "country",
              "author.location.country": user.location.country,
            },
            {
              visibility: "state",
              "author.location.country": user.location.country,
              "author.location.state": user.location.state,
            },
            {
              visibility: "city",
              "author.location.country": user.location.country,
              "author.location.state": user.location.state,
              "author.location.city": user.location.city,
            },
          ],
        },
      ];
      /* eslint-enable sort-keys */

      // Additional filters
      const { paramFilters } = req.params;
      if (paramFilters) {
        // TODO: additional filters
      }

      // Unlogged user limitation for post content size
      // TODO: how to check for logged/unlogged user?
      /* eslint-disable sort-keys */
      const contentProjection = user
        ? "$content"
        : {
            $cond: {
              if: { $gt: [{ $strLenCP: "$content" }, UNLOGGED_POST_SIZE] },
              then: {
                $concat: [
                  { $substr: ["$content", 0, UNLOGGED_POST_SIZE] },
                  "...",
                ],
              },
              else: "$content",
            },
          };
      /* eslint-enable sort-keys */

      const [postsErr, posts] = await app.to(
        Post.aggregate([
          {
            $geoNear: {
              distanceField: "distance",
              key: "author.location.coordinates",
              near: {
                $geometry: {
                  coordinates: user.location.coordinates,
                  type: "Point",
                },
              },
              query: { $and: filters },
            },
          },
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
              authorName: "$author.name",
              authorType: "$author.type",
              commentsCount: {
                $size: "$comments",
              },
              content: contentProjection,
              distance: true,
              expireAt: true,
              likesCount: {
                $size: "$likes",
              },
              location: "$author.location",
              title: true,
              types: true,
              visibility: true,
            },
          },
          // TODO: paginate
        ]),
      );

      if (postsErr) {
        req.log.error("Failed requesting posts", { postsErr });
        throw app.httpErrors.internalServerError();
      }

      return posts;
    },
  );

  app.post(
    "/",
    {
      preValidation: [app.authenticate],
      schema: createPostSchema,
    },
    async (req, reply) => {
      const { userId } = req.body;
      const [userErr, user] = await app.to(User.findById(userId));
      if (userErr) {
        throw app.httpErrors.notFound();
      }

      const { body: postProps } = req;

      // Creates embedded author document
      postProps.author = {
        id: user.id,
        location: user.location,
        name: `${user.firstName} ${user.lastName}`,
        type: user.type,
      };

      // ExpireAt needs to calculate the date
      postProps.expireAt = moment().add(1, `${postProps.expireAt}s`);

      // Initial empty likes array
      postProps.likes = [];

      const [err, post] = await app.to(new Post(postProps).save());

      if (err) {
        req.log.error("Failed creating post", { err });
        throw app.httpErrors.internalServerError();
      }

      reply.code(201);
      return post;
    },
  );

  // /posts/postId

  app.get(
    "/:postId",
    {
      preValidation: [app.authenticate],
      schema: getPostByIdSchema,
    },
    async (req) => {
      const { postId } = req.params;
      const [postErr, post] = await app.to(Post.findById(postId));
      if (postErr) {
        throw app.httpErrors.notFound();
      }

      // TODO: add pagination
      const [commentErr, commentQuery] = await app.to(
        Comment.aggregate([
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
                $size: { $ifNull: ["$children", []] },
              },
            },
          },
          {
            $group: {
              _id: null,
              comments: { $push: "$$ROOT" },
              numComments: { $sum: { $add: ["$childCount", 1] } },
            },
          },
        ]),
      );
      if (commentErr) {
        req.log.error("Failed retrieving comments", { commentErr });
        throw app.httpErrors.internalServerError();
      }

      const { comments = [], numComments = 0 } = commentQuery;

      return {
        comments,
        numComments,
        post,
      };
    },
  );

  app.delete(
    "/:postId",
    {
      preValidation: [app.authenticate],
      schema: deletePostSchema,
    },
    async (req) => {
      const { userId } = req.body;
      const { postId } = req.params;
      const [findErr, post] = await app.to(Post.findById(postId));
      if (findErr) {
        throw app.httpErrors.notFound();
      } else if (post.author.id !== userId) {
        throw app.httpErrors.forbidden();
      }

      const [deletePostErr, deletedCount] = await app.to(post.delete());
      if (deletePostErr) {
        req.log.error("Failed deleting post", { deletePostErr });
        throw app.httpErrors.internalServerError();
      }

      const {
        deletedCommentsCount,
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
    {
      preValidation: [app.authenticate],
      schema: updatePostSchema,
    },
    async (req) => {
      const { userId } = req.body;
      const [err, post] = await app.to(Post.findById(req.params.postId));
      if (err) {
        throw app.httpErrors.notFound();
      } else if (post.author.id !== userId) {
        throw app.httpErrors.forbidden();
      }
      const { body } = req;

      // ExpireAt needs to calculate the date
      if (body.hasOwnProperty("expireAt")) {
        body.expireAt = moment().add(1, `${body.expireAt}s`);
      }

      const [updateErr, updatedPost] = await app.to(
        Object.assign(post, body).save(),
      );

      if (updateErr) {
        req.log.error("Failed updating post", { updateErr });
        throw app.httpErrors.internalServerError();
      }

      return updatedPost;
    },
  );

  app.put(
    "/:postId/likes/:userId",
    {
      preValidation: [app.authenticate],
      schema: likeUnlikePostSchema,
    },
    async (req) => {
      const { postId, userId } = req.params;

      const [updateErr, updatedPost] = await app.to(
        Post.findOneAndUpdate(
          { _id: postId },
          { $addToSet: { likes: userId } },
          { new: true },
        ),
      );
      if (updateErr) {
        throw app.httpErrors.notFound();
      }

      return {
        likes: updatedPost.likes,
        likesCount: updatedPost.likes.length,
      };
    },
  );

  app.delete(
    "/:postId/likes/:userId",
    {
      preValidation: [app.authenticate],
      schema: likeUnlikePostSchema,
    },
    async (req) => {
      const { postId, userId } = req.params;

      const [updateErr, updatedPost] = await app.to(
        Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { likes: userId } },
          { new: true },
        ),
      );
      if (updateErr) {
        throw app.httpErrors.notFound();
      }

      return {
        likes: updatedPost.likes,
        likesCount: updatedPost.likes.length,
      };
    },
  );

  // -- Comments
  const COMMENT_PAGE_SIZE = 5;

  app.get(
    "/:postId/comments",
    { preValidation: [app.authenticate], schema: getCommentsSchema },
    async (req) => {
      const { limit, skip } = req.query;
      const { postId } = req.params;
      if (!postId) {
        throw app.httpErrors.badRequest();
      }

      const [commentErr, comments] = await app.to(
        Comment.aggregate([
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
                $size: { $ifNull: ["$children", []] },
              },
            },
          },
          {
            $skip: skip || 0,
          },
          {
            $limit: limit || COMMENT_PAGE_SIZE,
          },
        ]),
      );
      if (commentErr) {
        req.log.error("Failed retrieving comments", { commentErr });
        throw app.httpErrors.internalServerError();
      }

      return comments;
    },
  );

  app.post(
    "/:postId/comments",
    { preValidation: [app.authenticate], schema: createCommentSchema },
    async (req, reply) => {
      const { parentId, userId } = req.body;
      const [userErr, user] = await app.to(User.findById(userId));
      if (userErr) {
        throw app.httpErrors.notFound();
      }

      const { postId } = req.params;
      const { body: commentProps } = req;
      if (!postId) {
        throw app.httpErrors.badRequest();
      }

      // Assign postId and parent comment id (if present)
      commentProps.postId = postId;
      if (parentId) {
        commentProps.parentId = parentId;
      }

      // Creates embedded author document
      commentProps.author = {
        id: user.id,
        location: user.location,
        name: user.name,
        type: user.type,
      };

      // Initial empty likes array
      commentProps.likes = [];

      const [err, comment] = await app.to(new Comment(commentProps).save());

      if (err) {
        req.log.error("Failed creating comment", { err });
        throw app.httpErrors.internalServerError();
      }

      reply.code(201);
      return comment;
    },
  );

  app.patch(
    "/:postId/comments/:commentId",
    { preValidation: [app.authenticate], schema: updateCommentSchema },
    async (req) => {
      const { content, userId } = req.body;
      const { postId, commentId } = req.params;
      if (!postId || !commentId) {
        throw app.httpErrors.badRequest();
      }

      const [err, comment] = await app.to(Comment.findById(commentId));
      if (err) {
        throw app.httpErrors.notFound();
      } else if (comment.author.id !== userId) {
        throw app.httpErrors.forbidden();
      }

      comment.content = content;
      const [updateErr, updatedComment] = await app.to(comment.save());
      if (updateErr) {
        req.log.error("Failed updating comment", { updateErr });
        throw app.httpErrors.internalServerError();
      }

      return updatedComment;
    },
  );

  app.delete(
    "/:postId/comments/:commentId",
    { preValidation: [app.authenticate], schema: deleteCommentSchema },
    async (req) => {
      const { userId } = req.body;
      const { commentId } = req.params;
      const [findErr, comment] = await app.to(Comment.findById(commentId));
      if (findErr) {
        throw app.httpErrors.notFound();
      } else if (comment.author.id !== userId) {
        throw app.httpErrors.forbidden();
      }

      const [deleteCommentErr, deletedComment] = await app.to(comment.delete());
      if (deleteCommentErr) {
        req.log.error("Failed deleting comment", { deleteCommentErr });
        throw app.httpErrors.internalServerError();
      }

      const {
        deletedCount: deletedNestedCount,
        ok: deleteNestedOk,
      } = await Comment.deleteMany({ parentId: commentId });
      if (deleteNestedOk !== 1) {
        app.log.error("failed removing nested comments for deleted comment", {
          commentId,
        });
      }

      return {
        deletedComment,
        deletedCount: deletedNestedCount + 1,
        success: true,
      };
    },
  );

  app.put(
    "/:postId/comments/:commentId/likes/:userId",
    { preValidation: [app.authenticate], schema: likeUnlikeCommentSchema },
    async (req) => {
      const { commentId, userId } = req.params;
      const [updateErr, updatedComment] = await app.to(
        Comment.findOneAndUpdate(
          { _id: commentId },
          { $addToSet: { likes: userId } },
          { new: true },
        ),
      );
      if (updateErr) {
        throw app.httpErrors.notFound();
      }

      return {
        likes: updatedComment.likes,
        likesCount: updatedComment.likes.length,
      };
    },
  );

  app.delete(
    "/:postId/comments/:commentId/likes/:userId",
    { preValidation: [app.authenticate], schema: likeUnlikeCommentSchema },
    async (req) => {
      const { commentId, userId } = req.params;

      const [updateErr, updatedComment] = await app.to(
        Comment.findOneAndUpdate(
          { _id: commentId },
          { $pull: { likes: userId } },
          { new: true },
        ),
      );
      if (updateErr) {
        throw app.httpErrors.notFound();
      }

      return {
        likes: updatedComment.likes,
        likesCount: updatedComment.likes.length,
      };
    },
  );
}

module.exports = routes;
