const { createFeedbackSchema } = require("./schema/feedback");

/*
 * /api/feedback
 */
async function routes(app) {
  const Feedback = app.mongo.model("Feedback");

  app.post("/", { schema: createFeedbackSchema }, async (req, reply) => {
    const { userId } = req.body;

    if (userId) {
      const [err, userFeedback] = await app.to(Feedback.find({ userId }));
      if (userFeedback[0] || err) {
        throw app.httpErrors.internalServerError();
      }
    }

    const [err] = await app.to(
      new Feedback({
        ...req.body,
        ipAddress: req.ip,
      }).save(),
    );

    if (err) throw app.httpErrors.internalServerError();

    setImmediate(() => {
      reply.code(201).send({ success: true });
    });

    return reply;
  });
}

module.exports = routes;
