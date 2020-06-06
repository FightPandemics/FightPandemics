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
  const POST_PAGE_SIZE = 5;
  const UNLOGGED_POST_SIZE = 120;
  const EXPIRATION_OPTIONS = ["day", "week", "month"];

  app.get(
    "/",
    {
      preValidation: [app.authenticateOptional],
      schema: getPostsSchema,
    },
    async (req) => {
      const { userId } = req;
      const { limit, filter: paramFilters, skip } = req.query;
      let user;
      let userErr;
      if (userId) {
        [userErr, user] = await app.to(User.findById(userId));
        if (userErr) {
          throw app.httpErrors.forbidden();
        }
      }

      // Base filters - expiration and visibility
      /* eslint-disable sort-keys */
      const filters = [
        { $or: [{ expireAt: null }, { expireAt: { $gt: new Date() } }] },
      ];
      if (user) {
        filters.push({
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
        });
      }
      /* eslint-enable sort-keys */

      // Additional filters
      if (paramFilters) {
        // TODO: additional filters
      }

      // Unlogged user limitation for post content size
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

      const sortAndFilterSteps = user
        ? [
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
          ]
        : [{ $match: { $and: filters } }, { $sort: { createdAt: -1 } }];

      const aggregationPipeline = [
        ...sortAndFilterSteps,
        {
          $skip: skip || 0,
        },
        {
          $limit: limit || POST_PAGE_SIZE,
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
            author: true,
            commentsCount: {
              $size: { $ifNull: ["$comments", []] },
            },
            content: contentProjection,
            distance: true,
            expireAt: true,
            externalLinks: true,
            language: true,
            liked: { $in: [mongoose.Types.ObjectId(userId), "$likes"] },
            likesCount: {
              $size: { $ifNull: ["$likes", []] },
            },
            objective: true,
            title: true,
            types: true,
            visibility: true,
          },
        },
      ];

      const [postsErr, posts] = await app.to(
        Post.aggregate(aggregationPipeline),
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
      const { userId, body: postProps } = req;
      const [userErr, user] = await app.to(User.findById(userId));
      if (userErr) {
        throw app.httpErrors.notFound();
      }

      // Creates embedded author document
      postProps.author = {
        id: mongoose.Types.ObjectId(user.id),
        location: user.location,
        name: user.name,
        photo: user.photo,
        type: user.type,
      };

      // ExpireAt needs to calculate the date
      if (EXPIRATION_OPTIONS.includes(postProps.expireAt)) {
        postProps.expireAt = moment().add(1, `${postProps.expireAt}s`);
      } else {
        postProps.expireAt = null;
      }

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

      const { comments = [], numComments = 0 } = commentQuery[0];

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
      const { userId } = req;
      const { postId } = req.params;
      const [findErr, post] = await app.to(Post.findById(postId));
      if (findErr) {
        throw app.httpErrors.notFound();
      } else if (!userId.equals(post.author.id)) {
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
      const { userId } = req;
      const [err, post] = await app.to(Post.findById(req.params.postId));
      if (err) {
        throw app.httpErrors.notFound();
      } else if (!userId.equals(post.author.id)) {
        throw app.httpErrors.forbidden();
      }
      const { body } = req;

      // ExpireAt needs to calculate the date
      if (EXPIRATION_OPTIONS.includes(postProps.expireAt)) {
        body.expireAt = moment().add(1, `${body.expireAt}s`);
      } else {
        body.expireAt = null;
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
      if (!req.userId.equals(req.params.userId)) {
        throw app.httpErrors.forbidden();
      }

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
      if (!req.userId.equals(req.params.userId)) {
        throw app.httpErrors.forbidden();
      }
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
      const { userId, body: commentProps, params } = req;
      const { postId } = params;

      const [userErr, user] = await app.to(User.findById(userId));
      if (userErr) {
        req.log.error("Failed retrieving user", { userErr });
        throw app.httpErrors.internalServerError();
      }

      // Assign postId and parent comment id (if present)
      commentProps.postId = mongoose.Types.ObjectId(postId);
      if ("parentId" in commentProps) {
        commentProps.parentId = mongoose.Types.ObjectId(commentProps.parentId);
      }

      // Creates embedded author document
      commentProps.author = {
        id: mongoose.Types.ObjectId(user.id),
        location: user.location,
        name: user.name,
        photo: user.photo,
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
      const { userId } = req;
      const { content } = req.body;
      const { commentId } = req.params;

      const [err, comment] = await app.to(Comment.findById(commentId));
      if (err) {
        req.log.error("Failed retrieving comment", { err });
        throw app.httpErrors.internalServerError();
      } else if (!userId.equals(comment.author.id)) {
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
      const { userId } = req;
      const { commentId } = req.params;
      const [findErr, comment] = await app.to(Comment.findById(commentId));
      if (findErr) {
        req.log.error("Failed retrieving findErr", { findErr });
        throw app.httpErrors.internalServerError();
      } else if (!userId.equals(comment.author.id)) {
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
      if (!req.userId.equals(req.params.userId)) {
        throw app.httpErrors.forbidden();
      }
      const { userId } = req;
      const { commentId } = req.params;

      const [updateErr, updatedComment] = await app.to(
        Comment.findOneAndUpdate(
          { _id: commentId },
          { $addToSet: { likes: userId } },
          { new: true },
        ),
      );
      if (updateErr) {
        req.log.error("Failed liking comment", { updateErr });
        throw app.httpErrors.internalServerError();
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
      if (!req.userId.equals(req.params.userId)) {
        throw app.httpErrors.forbidden();
      }
      const { userId } = req;
      const { commentId } = req.params;

      const [updateErr, updatedComment] = await app.to(
        Comment.findOneAndUpdate(
          { _id: commentId },
          { $pull: { likes: userId } },
          { new: true },
        ),
      );
      if (updateErr) {
        req.log.error("Failed unliking comment", { updateErr });
        throw app.httpErrors.internalServerError();
      }

      return {
        likes: updatedComment.likes,
        likesCount: updatedComment.likes.length,
      };
    },
  );
}

module.exports = routes;
