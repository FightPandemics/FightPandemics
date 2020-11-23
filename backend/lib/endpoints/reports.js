const {
  createPostReportSchema,
  getPostReportsSchema,
} = require("./schema/reports");
const { setReqPermLevel } = require("../utils");
const REPORTS_PER_PAGE = 10;

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
          { $addToSet: { reportedBy: reportProps }, status: "reported" },
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
        setReqPermLevel("moderator"),
        app.checkPermission,
      ],
      schema: getPostReportsSchema,
    },
    async (req) => {
      const {
        query: { page },
      } = req;

      const skip = REPORTS_PER_PAGE * page;

      const [getPostsErr, reportedPosts] = await app.to(
        Post.find({ status: "reported" }, { new: true })
          .skip(skip)
          .limit(REPORTS_PER_PAGE),
      );
      if (getPostsErr) {
        req.log.error(updateErr, "Failed getting posts");
        throw app.httpErrors.internalServerError();
      }

      return reportedPosts;
    },
  );
}

module.exports = routes;
