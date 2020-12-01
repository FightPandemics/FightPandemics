const {
  createPostReportSchema,
} = require("./schema/reports");

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
}

module.exports = routes;
