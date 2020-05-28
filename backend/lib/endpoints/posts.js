const httpErrors = require("http-errors");
const mongoose = require("mongoose");
const moment = require("moment");

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
  const User = mongo.model("User");

  // /posts
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
      const { paramFilters } = req.params;
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
