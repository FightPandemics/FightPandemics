const {
  createPostReportSchema,
  getAuditLogSchema,
  getPostReportsSchema,
  moderatorActionSchema,
} = require("./schema/reports");
const { translateISOtoRelativeTime } = require("../utils");
const { SCOPES } = require("../constants");

const MAX_REPORTS_PER_PAGE = 20;
const UNLOGGED_POST_SIZE = 120;

/*
 * /api/reports
 */
async function routes(app) {
  const { mongo } = app;
  const Post = mongo.model("Post");
  const Audit = mongo.model("Audit");

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
        app.checkScopes([SCOPES.DASH_READ_ACCESS]),
      ],
      schema: getPostReportsSchema,
    },
    async (req) => {
      const {
        query: { limit, status, skip, includeMeta, keywords },
      } = req;

      const filters = [{ status: status }];
      if (status === "public") {
        // rejected report, status is "public", but have reportedBy.length
        filters.push({ reportedBy: { $exists: true, $not: { $size: 0 } } });
      }

      const matchingStage = {
        $match: { $and: filters },
      };
      const sortingStage = {};

      if (keywords) {
        matchingStage.$match.$text = {
          $search: keywords,
          $caseSensitive: false,
          $diacriticSensitive: false,
        };
        sortingStage.$sort = { score: { $meta: "textScore" } };
      } else {
        sortingStage.$sort = {
          [status === "flagged" ? "reportsCount" : "updatedAt"]: -1,
        };
      }

      console.log(matchingStage);
      const aggregationPipelineResults = [
        matchingStage,
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
        sortingStage,
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
        Post.aggregate(aggregationPipelineResults).then((posts) => {
          posts.forEach((post) => {
            post.elapsedTimeText = {
              created: translateISOtoRelativeTime(post.createdAt),
              isEdited: post.isEdited,
            };
          });
          return posts;
        }),
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

  // accept/reject a post report
  app.patch(
    "/posts/:postId",
    {
      preValidation: [
        app.authenticate,
        app.setActor,
        app.checkScopes([SCOPES.REPORT_WRITE_ACCESS]),
      ],
      schema: moderatorActionSchema,
    },
    async (req, reply) => {
      const {
        actor,
        params: { postId },
        body: actionProps,
      } = req;
      actionProps.moderatorId = actor._id;
      actionProps.postId = postId;

      const updates = {};

      if (actionProps.action === "accept") {
        updates.status = "removed";
      } else if (actionProps.action === "reject") {
        updates.status = "public";
      }

      const [updateErr, updatedPost] = await app.to(
        Post.findByIdAndUpdate(postId, updates),
      );

      if (updateErr) {
        req.log.error(updateErr, "Failed reporting post");
        throw app.httpErrors.internalServerError();
      } else if (updatedPost === null) {
        throw app.httpErrors.notFound();
      }

      const [err] = await app.to(new Audit(actionProps).save());

      if (err) {
        req.log.error(err, "Failed saving audit log action");
        throw app.httpErrors.internalServerError();
      }

      // action, post, actorId (triggredBy), authUserId, details
      // app.notifier.notify("report", updatedPost, actor._id, userId);

      reply.code(201);
      return {
        success: true,
      };
    },
  );

  // report a post
  app.get(
    "/logs",
    {
      preValidation: [
        app.authenticate,
        app.setActor,
        app.checkScopes([SCOPES.LOGS_READ_ACCESS]),
      ],
      schema: getAuditLogSchema,
    },
    async (req) => {
      const {
        query: { limit, skip },
      } = req;

      const aggregationPipelineResults = [
        {
          $skip: parseInt(skip) || 0,
        },
        {
          $limit: Math.min(limit || MAX_REPORTS_PER_PAGE),
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $lookup: {
            as: "moderator",
            foreignField: "_id",
            from: "users",
            localField: "moderatorId",
          },
        },
        {
          $set: {
            moderator: { $arrayElemAt: ["$moderator", 0] },
          },
        },
        {
          $set: {
            "moderator.name": {
              $concat: ["$moderator.firstName", " ", "$moderator.lastName"],
            },
          },
        },
        {
          $project: {
            postId: 1,
            justification: 1,
            createdAt: 1,
            action: 1,
            "moderator.name": 1,
            "moderator.photo": 1,
          },
        },
      ];

      const [logsErr, logs] = await app.to(
        Audit.aggregate(aggregationPipelineResults).then((logs) => {
          logs.forEach((log) => {
            log.elapsedTimeText = {
              created: translateISOtoRelativeTime(log.createdAt),
            };
          });
          return logs;
        }),
      );

      if (logsErr) {
        req.log.error(logsErr, "Failed requesting logs");
        throw app.httpErrors.internalServerError();
      } else if (logs === null) {
        return { logs: [] };
      } else {
        return { logs };
      }
    },
  );
}

module.exports = routes;
