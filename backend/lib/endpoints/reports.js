const {
  createPostReportSchema,
  getPostReportsSchema,
} = require("./schema/reports");
const MAX_REPORTS_PER_PAGE = 20;
const UNLOGGED_POST_SIZE = 120;

/*
 * /api/reports
 */
async function routes(app) {
  const { mongo } = app;
  const Post = mongo.model("Post");

  // report a post
  app.post(
    "/posts/:postId",
    {
      preValidation: [app.authenticate, app.setActor],
      schema: createPostReportSchema,
    },
    async (req, reply) => {
      const {
        actor,
        // userId,
        params: { postId },
        body: reportProps,
      } = req;

      reportProps.id = actor._id;

      const [updateErr, updatedPost] = await app.to(
        Post.findOneAndUpdate(
          // the only way to ensure unique reports, mongoose doesn't support subdocuments unqiue indexes
          { _id: postId, "reportedBy.id": { $ne: reportProps.id } },
          { $addToSet: { reportedBy: reportProps }, status: "flagged" },
        ),
      );
      if (updateErr) {
        req.log.error(updateErr, "Failed reporting post");
        throw app.httpErrors.internalServerError();
      } else if (updatedPost === null) {
        throw app.httpErrors.notFound();
      }

      // action, post, actorId (triggredBy), authUserId, details
      //app.notifier.notify("report", updatedPost, actor._id, userId);

      reply.code(201);
      return {
        success: true,
      };
    },
  );

  // get all reported posts
  app.get(
    "/posts",
    {
      preValidation: [
        app.authenticate,
        app.setActor,
        app.checkPermission("moderator"),
      ],
      schema: getPostReportsSchema,
    },
    async (req) => {
      const {
        query: { limit, status, skip, includeMeta },
      } = req;

      const filters = [{ status: status }];
      if (status === "public") {
        // rejected report, status is "public", but have reportedBy.length
        filters.push({ reportedBy: { $exists: true, $not: { $size: 0 } } });
      }

      const aggregationPipelineResults = [
        {
          $match: { $and: filters },
        },
        {
          $skip: parseInt(skip) || 0,
        },
        {
          $limit: Math.min(limit || MAX_REPORTS_PER_PAGE),
        },
        {
          $set: {
            reportsCount: {
              $size: {
                $ifNull: ["$reportedBy", []],
              },
            },
            content: {
              $concat: [
                { $substrCP: ["$content", 0, UNLOGGED_POST_SIZE] },
                "...",
              ],
            },
          },
        },
        {
          $project: {
            "author.location": false,
          },
        },
        {
          $sort: {
            reportsCount: 1,
          },
        },
      ];

      // Get the total results without pagination steps but with filtering aplyed - totalResults
      /* eslint-disable sort-keys */
      const totalResultsAggregationPipeline = await Post.aggregate([
        {
          $match: { $and: filters },
        },
        { $group: { _id: null, count: { $sum: 1 } } },
      ]);
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
}

module.exports = routes;
