const { createFeedbackSchema } = require("./schema/feedback");

/*
 * /api/feedback
 */
async function routes(app) {
  const Feedback = app.mongo.model("Feedback");

  app.post("/", { schema: createFeedbackSchema }, async (req, reply) => {
    const { userId } = req.body;

    if (userId) {
      const userFeedback = await Feedback.find({ userId });
      if (userFeedback[0]) {
        reply.conflict("User already submitted feedback");
      }
    }

    return new Feedback({
      ...req.body,
      ipAddress: req.ip,
    })
      .save()
      .then(() => {
        reply.code(201).send({ success: true });
      });
  });
}

module.exports = routes;
