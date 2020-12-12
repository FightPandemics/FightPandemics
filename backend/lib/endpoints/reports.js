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
        app.checkScopes([SCOPES.REPORT_READ]),
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

      const aggregationPipelineResults = [
        matchingStage,
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
        {
          $skip: parseInt(skip) || 0,
        },
        {
          $limit: Math.min(limit || MAX_REPORTS_PER_PAGE),
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
        app.checkScopes([SCOPES.REPORT_WRITE]),
      ],
      schema: moderatorActionSchema,
    },
    async (req, reply) => {
      const {
        userId,
        params: { postId },
        body: actionProps,
      } = req;
      actionProps.moderatorId = userId;
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

      if (actionProps.action === "accept") {
        // action, post, actorId (moderator), authUserId (moderator), details (justification)
        app.notifier.notify(
          "report",
          updatedPost,
          actionProps.moderatorId,
          actionProps.moderatorId,
          { justification: actionProps.justification },
        );
      }

      reply.code(201);
      return {
        success: true,
      };
    },
  );

  // audit logs
  app.get(
    "/logs",
    {
      preValidation: [
        app.authenticate,
        app.setActor,
        app.checkScopes([SCOPES.LOGS_READ]),
      ],
      schema: getAuditLogSchema,
    },
    async (req) => {
      const {
        query: { limit, skip },
      } = req;

      const aggregationPipelineResults = [
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $skip: parseInt(skip) || 0,
        },
        {
          $limit: Math.min(limit || MAX_REPORTS_PER_PAGE),
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

      const totalLogsCount = await Audit.countDocuments();

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
        return {
          logs: [],
          meta: {
            total: 0,
          },
        };
      } else {
        return {
          logs,
          meta: {
            total: totalLogsCount || 0,
          },
        };
      }
    },
  );

  app.get(
    "/stats",
    {
      preValidation: [
        app.authenticate,
        app.setActor,
        app.checkScopes([SCOPES.STATS_READ]),
      ],
    },
    async (req) => {
      const aggregationPipeline = [
        {
          $facet: {
            pendingPostsCount: [
              {
                $match: { status: "flagged" },
              },
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
            ],
            removedPostsCount: [
              {
                $match: { status: "removed" },
              },
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
            ],
            keptPostsCount: [
              {
                $match: {
                  status: "public",
                  reportedBy: { $exists: true, $not: { $size: 0 } },
                },
              },
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
            ],
            dailyNewReportsCounts: [
              {
                $match: {
                  status: "flagged",
                  createdAt: { $gt: new Date(Date.now() - 2.678e9) },
                },
              },
              {
                $unwind: "$reportedBy",
              },
              {
                $set: {
                  monthDay: {
                    $dateToString: {
                      format: "%d/%m",
                      date: "$reportedBy.createdAt",
                    },
                  },
                  totalCount: { $sum: 1 },
                },
              },
              {
                $group: {
                  _id: "$monthDay",
                  count: { $sum: 1 },
                },
              },
            ],
            KeptReportReasonCounts: [
              {
                $match: {
                  status: "public",
                  reportedBy: {
                    $exists: true,
                    $not: { $size: 0 },
                  },
                },
              },
              {
                $unwind: "$reportedBy",
              },
              {
                $set: {
                  reasonSplitted: { $split: ["$reportedBy.reason", "|"] },
                },
              },
              { $unwind: "$reasonSplitted" },
              {
                $group: {
                  _id: null,
                  reasons: { $push: "$reasonSplitted" },
                },
              },
              {
                $project: {
                  reasons: {
                    $filter: {
                      input: "$reasons",
                      as: "reason",
                      cond: {
                        $or: [
                          { $eq: ["$$reason", "Spam"] },
                          { $eq: ["$$reason", "Inappropriate Content"] },
                          { $eq: ["$$reason", "Violates Terms"] },
                          { $eq: ["$$reason", "Other"] },
                        ],
                      },
                    },
                  },
                },
              },
              { $unwind: "$reasons" },
              {
                $group: {
                  _id: "$reasons",
                  count: { $sum: 1 },
                },
              },
            ],
            removedReportReasonCounts: [
              {
                $match: {
                  status: "removed",
                },
              },
              {
                $unwind: "$reportedBy",
              },
              {
                $set: {
                  reasonSplitted: { $split: ["$reportedBy.reason", "|"] },
                },
              },
              { $unwind: "$reasonSplitted" },
              {
                $group: {
                  _id: null,
                  reasons: { $push: "$reasonSplitted" },
                },
              },
              {
                $project: {
                  reasons: {
                    $filter: {
                      input: "$reasons",
                      as: "reason",
                      cond: {
                        $or: [
                          { $eq: ["$$reason", "Spam"] },
                          { $eq: ["$$reason", "Inappropriate Content"] },
                          { $eq: ["$$reason", "Violates Terms"] },
                          { $eq: ["$$reason", "Other"] },
                        ],
                      },
                    },
                  },
                },
              },
              { $unwind: "$reasons" },
              {
                $group: {
                  _id: "$reasons",
                  count: { $sum: 1 },
                },
              },
            ],
            pendingReportReasonCounts: [
              {
                $match: {
                  status: "flagged",
                },
              },
              {
                $unwind: "$reportedBy",
              },
              {
                $set: {
                  reasonSplitted: { $split: ["$reportedBy.reason", "|"] },
                },
              },
              { $unwind: "$reasonSplitted" },
              {
                $group: {
                  _id: null,
                  reasons: { $push: "$reasonSplitted" },
                },
              },
              {
                $project: {
                  reasons: {
                    $filter: {
                      input: "$reasons",
                      as: "reason",
                      cond: {
                        $or: [
                          { $eq: ["$$reason", "Spam"] },
                          { $eq: ["$$reason", "Inappropriate Content"] },
                          { $eq: ["$$reason", "Violates Terms"] },
                          { $eq: ["$$reason", "Other"] },
                        ],
                      },
                    },
                  },
                },
              },
              { $unwind: "$reasons" },
              {
                $group: {
                  _id: "$reasons",
                  count: { $sum: 1 },
                },
              },
            ],
          },
        },
      ];

      const auditLogStatsAggregationPipeline = [
        {
          $match: {
            createdAt: { $gt: new Date(Date.now() - 2.678e9) },
          },
        },
        {
          $facet: {
            approvedReports: [
              {
                $match: {action: "accept"}
              },
              {
                $set: {
                  monthDay: {
                    $dateToString: {
                      format: "%d/%m",
                      date: "$createdAt",
                    },
                  },
                  totalCount: { $sum: 1 },
                },
              },
              {
                $group: {
                  _id: "$monthDay",
                  count: { $sum: 1 },
                },
              },
            ],
            rejectedReports: [
              {
                $match: {action: "reject"}
              },
              {
                $set: {
                  monthDay: {
                    $dateToString: {
                      format: "%d/%m",
                      date: "$createdAt",
                    },
                  },
                  totalCount: { $sum: 1 },
                },
              },
              {
                $group: {
                  _id: "$monthDay",
                  count: { $sum: 1 },
                },
              },
            ]
          }
        }
      ];

      const [postsStatsErr, postsStats] = await app.to(
        Post.aggregate(aggregationPipeline),
      );

      const [auditStatsErr, auditStats] = await app.to(
        Audit.aggregate(auditLogStatsAggregationPipeline),
      );

      if (postsStatsErr || auditStatsErr) {
        req.log.error(
          postsStatsErr || auditStatsErr,
          "Failed requesting stats",
        );
        throw app.httpErrors.internalServerError();
      } else if (postsStats === null || !postsStats[0] || !auditStats || !auditStats[0]) {
        return { stats: null };
      } else {
        postsStats[0].auditStats = auditStats[0];
        return {
          stats: postsStats[0],
        };
      }
    },
  );
}

module.exports = routes;
