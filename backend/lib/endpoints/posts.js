const mongoose = require("mongoose");
const moment = require("moment");

const { setElapsedTimeText, createSearchRegex } = require("../utils");

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
      preValidation: [app.authenticateOptional, app.setActor],
      schema: getPostsSchema,
    },
    async (req) => {
      const {
        actor,
        query: {
          authorId,
          ignoreUserLocation,
          filter,
          keywords,
          limit,
          objective,
          skip,
          includeMeta,
        },
      } = req;
      const queryFilters = filter ? JSON.parse(decodeURIComponent(filter)) : {};

      // Base filters - expiration and visibility
      /* eslint-disable sort-keys */
      const filters = [
        { $or: [{ expireAt: null }, { expireAt: { $gt: new Date() } }] },
      ];

      // prefer location from query filters, then user if authenticated
      let location;
      if (queryFilters.location) {
        location = queryFilters.location;
      } else if (actor && !ignoreUserLocation) {
        location = actor.location;
      }

      if (location) {
        filters.push({
          $or: [
            { visibility: "worldwide" },
            {
              visibility: "country",
              "author.location.country": location.country,
            },
            {
              visibility: "state",
              "author.location.country": location.country,
              "author.location.state": location.state,
            },
            {
              visibility: "city",
              "author.location.country": location.country,
              "author.location.state": location.state,
              "author.location.city": location.city,
            },
          ],
        });
      }
      /* eslint-enable sort-keys */

      // Additional filters
      const { providers, type } = queryFilters; // from filterOptions.js
      if (authorId) {
        filters.push({ "author.id": mongoose.Types.ObjectId(authorId) });
      }
      if (objective) {
        filters.push({ objective });
      }
      if (providers) {
        filters.push({ "author.type": { $in: providers } });
      }
      if (type) {
        filters.push({ types: { $in: type } });
      }

      // Unlogged user limitation for post content size
      /* eslint-disable sort-keys */
      const contentProjection = {
        $cond: {
          if: { $gt: [{ $strLenCP: "$content" }, UNLOGGED_POST_SIZE] },
          then: {
            $concat: [
              { $substrCP: ["$content", 0, UNLOGGED_POST_SIZE] },
              "...",
            ],
          },
          else: "$content",
        },
      };
      /* eslint-enable sort-keys */

      // if location is defined, use simple regex text query, in order to use $geoNear
      if (location && keywords) {
        const keywordsRegex = createSearchRegex(keywords);
        filters.push({
          $or: [
            { title: keywordsRegex },
            { content: keywordsRegex },
            { "author.name": keywordsRegex },
            { types: keywordsRegex },
          ],
        });
      }

      // _id starts with seconds timestamp so newer posts will sort together first
      // then in a determinate order (required for proper pagination)
      /* eslint-disable sort-keys */
      const sortAndFilterSteps = location
        ? [
            {
              $geoNear: {
                distanceField: "distance",
                key: "author.location.coordinates",
                near: {
                  $geometry: {
                    coordinates: location.coordinates,
                    type: "Point",
                  },
                },
                query: { $and: filters },
              },
            },
            { $sort: { distance: 1, _id: -1 } },
          ]
        : keywords
        ? [
            { $match: { $and: filters, $text: { $search: keywords } } },
            { $sort: { score: { $meta: "textScore" } } },
          ]
        : [{ $match: { $and: filters } }, { $sort: { _id: -1 } }];
      /* eslint-enable sort-keys */

      /* eslint-disable sort-keys */
      const paginationSteps =
        limit === -1
          ? [
              {
                $skip: skip || 0,
              },
            ]
          : [
              {
                $skip: skip || 0,
              },
              {
                $limit: limit || POST_PAGE_SIZE,
              },
            ];
      /* eslint-enable sort-keys */

      /* eslint-disable sort-keys */
      const lookupSteps = [
        {
          $lookup: {
            as: "comments",
            foreignField: "postId",
            from: "comments",
            localField: "_id",
          },
        },
      ];
      /* eslint-enable sort-keys */

      /* eslint-disable sort-keys */
      const projectionSteps = [
        {
          $project: {
            _id: true,
            "author.id": true,
            "author.location.city": true,
            "author.location.country": true,
            "author.location.state": true,
            "author.name": true,
            "author.photo": true,
            "author.type": true,
            commentsCount: {
              $size: { $ifNull: ["$comments", []] },
            },
            content: contentProjection,
            distance: true,
            expireAt: true,
            externalLinks: true,
            language: true,
            liked: {
              $in: [
                mongoose.Types.ObjectId(actor ? actor._id : null),
                "$likes",
              ],
            },
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
      /* eslint-enable sort-keys */

      const aggregationPipelineResults = [
        ...sortAndFilterSteps,
        ...paginationSteps,
        ...lookupSteps,
        ...projectionSteps,
      ];

      // Get the total results without pagination steps but with filtering aplyed - totalResults
      /* eslint-disable sort-keys */
      const totalResultsAggregationPipeline = await Post.aggregate(
        keywords && !location
          ? [
              { $match: { $and: filters, $text: { $search: keywords } } },
              { $group: { _id: null, count: { $sum: 1 } } },
            ]
          : [
              { $match: { $and: filters } },
              { $group: { _id: null, count: { $sum: 1 } } },
            ],
      );
      /* eslint-enable sort-keys */

      const [postsErr, posts] = await app.to(
        Post.aggregate(aggregationPipelineResults),
      );

      const responseHandler = (response) => {
        if (!includeMeta) {
          return posts;
        }
        return {
          meta: {
            total: totalResultsAggregationPipeline.length
              ? totalResultsAggregationPipeline[0].count
              : 0,
          },
          data: response,
        };
      };

      if (postsErr) {
        req.log.error(postsErr, "Failed requesting posts");
        throw app.httpErrors.internalServerError();
      } else if (posts === null) {
        return responseHandler([]);
      } else {
        return responseHandler(posts);
      }
    },
  );

  app.post(
    "/",
    {
      preValidation: [app.authenticate, app.setActor],
      schema: createPostSchema,
    },
    async (req, reply) => {
      const { actor, body: postProps } = req;

      // Creates embedded author document
      postProps.author = {
        id: mongoose.Types.ObjectId(actor.id),
        location: actor.location,
        name: actor.name,
        photo: actor.photo,
        type: actor.type,
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
        req.log.error(err, "Failed creating post");
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
      preValidation: [app.authenticateOptional, app.setActor],
      schema: getPostByIdSchema,
    },
    async (req) => {
      const {
        actor,
        params: { postId },
      } = req;
      const [postErr, post] = await app.to(
        Post.findById(postId).select({
          "author.location.address": false,
          "author.location.coordinates": false,
          "author.location.neighborhood": false,
          "author.location.zip": false,
        }),
      );
      if (postErr) {
        req.log.error(postErr, "Failed retrieving post");
        throw app.httpErrors.internalServerError();
      } else if (post === null) {
        throw app.httpErrors.notFound();
      }

      /* eslint-disable sort-keys */
      // Keys shouldn't be sorted here since this is a query, so order of the
      // parameters is important to hit the right database index.
      const [commentQueryErr, commentQuery] = await app.to(
        Comment.find({
          postId: mongoose.Types.ObjectId(postId),
          parentId: null,
        }).count(),
      );
      /* eslint-enable sort-keys */

      if (commentQueryErr) {
        req.log.error(commentQueryErr, "Failed retrieving comments");
        throw app.httpErrors.internalServerError();
      }

      const projectedPost = {
        ...post.toObject(),
        liked: post.likes.includes(
          mongoose.Types.ObjectId(actor ? actor._id : null),
        ),
        likesCount: post.likes.length,
      };

      return {
        numComments: commentQuery || 0,
        post: projectedPost,
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
        req.log.error(findErr, "Failed retrieving post");
        throw app.httpErrors.internalServerError();
      } else if (post === null) {
        throw app.httpErrors.notFound();
      }

      const [, author] = await app.to(User.findById(post.author.id));
      if (!(userId.equals(author.id) || userId.equals(author.ownerId))) {
        throw app.httpErrors.forbidden();
      }

      const [deletePostErr, deletedCount] = await app.to(post.delete());
      if (deletePostErr) {
        req.log.error(deletePostErr, "Failed deleting post");
        throw app.httpErrors.internalServerError();
      }
      const {
        deletedCommentsCount,
        ok: deleteCommentsOk,
      } = await Comment.deleteMany({ postId });
      if (deleteCommentsOk !== 1) {
        app.log.error(`Failed removing comments for deleted post=${postId}`);
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
      const { userId, body } = req;
      const [err, post] = await app.to(Post.findById(req.params.postId));

      if (err) {
        req.log.error(err, "Failed retrieving post");
        throw app.httpErrors.internalServerError();
      } else if (post === null) {
        throw app.httpErrors.notFound();
      }

      const [, author] = await app.to(User.findById(post.author.id));
      if (!(userId.equals(author.id) || userId.equals(author.ownerId))) {
        throw app.httpErrors.forbidden();
      }

      // ExpireAt needs to calculate the date
      if (EXPIRATION_OPTIONS.includes(body.expireAt)) {
        body.expireAt = moment().add(1, `${body.expireAt}s`);
      } else {
        body.expireAt = null;
      }

      const [updateErr, updatedPost] = await app.to(
        Object.assign(post, body).save(),
      );

      if (updateErr) {
        req.log.error(updateErr, "Failed updating post");
        throw app.httpErrors.internalServerError();
      }

      return updatedPost;
    },
  );

  app.put(
    "/:postId/likes/:actorId",
    {
      preValidation: [app.authenticate, app.setActor],
      schema: likeUnlikePostSchema,
    },
    async (req) => {
      const {
        actor,
        params: { postId },
      } = req;

      const [updateErr, updatedPost] = await app.to(
        Post.findOneAndUpdate(
          { _id: postId },
          { $addToSet: { likes: actor._id } },
          { new: true },
        ),
      );
      if (updateErr) {
        req.log.error(updateErr, "Failed liking post");
        throw app.httpErrors.internalServerError();
      } else if (updatedPost === null) {
        throw app.httpErrors.notFound();
      }

      return {
        likes: updatedPost.likes,
        likesCount: updatedPost.likes.length,
      };
    },
  );

  app.delete(
    "/:postId/likes/:actorId",
    {
      preValidation: [app.authenticate, app.setActor],
      schema: likeUnlikePostSchema,
    },
    async (req) => {
      const {
        actor,
        params: { postId },
      } = req;

      const [updateErr, updatedPost] = await app.to(
        Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { likes: actor._id } },
          { new: true },
        ),
      );
      if (updateErr) {
        req.log.error(updateErr, "Failed unliking post");
        throw app.httpErrors.internalServerError();
      } else if (updatedPost === null) {
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
            $skip: parseInt(skip, 10) || 0,
          },
          {
            $limit: parseInt(limit, 10) || COMMENT_PAGE_SIZE,
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
        ]).then((comments) => {
          comments.forEach((comment) => {
            comment.elapsedTimeText = setElapsedTimeText(
              comment.createdAt,
              comment.updatedAt,
            );
          });
          return comments;
        }),
      );
      if (commentErr) {
        req.log.error(commentErr, "Failed retrieving comments");
        throw app.httpErrors.internalServerError();
      }

      return comments;
    },
  );

  app.post(
    "/:postId/comments",
    {
      preValidation: [app.authenticate, app.setActor],
      schema: createCommentSchema,
    },
    async (req, reply) => {
      const {
        actor,
        body: commentProps,
        params: { postId },
      } = req;

      // Assign postId and parent comment id (if present)
      commentProps.postId = mongoose.Types.ObjectId(postId);
      if ("parentId" in commentProps) {
        commentProps.parentId = mongoose.Types.ObjectId(commentProps.parentId);
      }

      // Creates embedded author document
      commentProps.author = {
        id: mongoose.Types.ObjectId(actor.id),
        name: actor.name,
        photo: actor.photo,
        type: actor.type,
      };

      // Initial empty likes array
      commentProps.likes = [];

      const [err, comment] = await app.to(new Comment(commentProps).save());

      if (err) {
        req.log.error(err, "Failed creating comment");
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
        req.log.error(err, "Failed retrieving comment");
        throw app.httpErrors.internalServerError();
      } else if (comment === null) {
        throw app.httpErrors.notFound();
      }

      const [, author] = await app.to(User.findById(comment.author.id));
      if (!(userId.equals(author.id) || userId.equals(author.ownerId))) {
        throw app.httpErrors.forbidden();
      }

      comment.content = content;
      const [updateErr, updatedComment] = await app.to(comment.save());
      if (updateErr) {
        req.log.error(updateErr, "Failed updating comment");
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
        req.log.error(findErr, "Failed retrieving comment");
        throw app.httpErrors.internalServerError();
      } else if (comment === null) {
        throw app.httpErrors.notFound();
      }

      const [, author] = await app.to(User.findById(comment.author.id));
      if (!(userId.equals(author.id) || userId.equals(author.ownerId))) {
        throw app.httpErrors.forbidden();
      }

      const [deleteCommentErr, deletedComment] = await app.to(comment.delete());
      if (deleteCommentErr) {
        req.log.error(deleteCommentErr, "Failed deleting comment");
        throw app.httpErrors.internalServerError();
      }

      const {
        deletedCount: deletedNestedCount,
        ok: deleteNestedOk,
      } = await Comment.deleteMany({ parentId: commentId });
      if (deleteNestedOk !== 1) {
        app.log.error(
          `Failed removing nested comments for deleted comment=${commentId}`,
        );
      }

      return {
        deletedComment,
        deletedCount: deletedNestedCount + 1,
        success: true,
      };
    },
  );

  app.put(
    "/:postId/comments/:commentId/likes/:actorId",
    {
      preValidation: [app.authenticate, app.setActor],
      schema: likeUnlikeCommentSchema,
    },
    async (req) => {
      const {
        actor,
        params: { commentId },
      } = req;

      const [updateErr, updatedComment] = await app.to(
        Comment.findOneAndUpdate(
          { _id: commentId },
          { $addToSet: { likes: actor._id } },
          { new: true },
        ),
      );
      if (updateErr) {
        req.log.error(updateErr, "Failed liking comment");
        throw app.httpErrors.internalServerError();
      }

      return {
        likes: updatedComment.likes,
        likesCount: updatedComment.likes.length,
      };
    },
  );

  app.delete(
    "/:postId/comments/:commentId/likes/:actorId",
    {
      preValidation: [app.authenticate, app.setActor],
      schema: likeUnlikeCommentSchema,
    },
    async (req) => {
      const {
        actor,
        params: { commentId },
      } = req;

      const [updateErr, updatedComment] = await app.to(
        Comment.findOneAndUpdate(
          { _id: commentId },
          { $pull: { likes: actor._id } },
          { new: true },
        ),
      );
      if (updateErr) {
        req.log.error(updateErr, "Failed unliking comment");
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
