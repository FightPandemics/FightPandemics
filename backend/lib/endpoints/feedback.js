const { createFeedbackSchema } = require("./schema/feedback");

/*
 * /api/feedback
 */
async function routes(app) {
  const Feedback = app.mongo.model("Feedback");

  app.post("/", { schema: createFeedbackSchema }, async (req, reply) => {
    // TODO: update backend to keep track of what user submitted feedback and save it in the db (save userid)
    /* commenting this out for soft launch
    const { userId } = req.body;
    if (userId) {
      const [userFeedbackErr, userFeedback] = await app.to(
        Feedback.findOne({
          userId,
        }),
      );

      if (userFeedback) {
        throw app.httpErrors.conflict("Feedback already submitted");
      }
    }
    */
    const [err] = await app.to(
      new Feedback({
        ...req.body,
        ipAddress: req.ip,
      }).save(),
    );

    if (err) {
      req.log.error(err, "Failed submitting feedback");
      throw app.httpErrors.internalServerError();
    }

    reply.code(201);
    return {
      success: true,
    };
  });
}

module.exports = routes;
