const { createFeedbackSchema } = require("./schema/feedback");

/*
 * /api/feedback
 */
async function routes(app) {
  const Feedback = app.mongo.model("Feedback");

  app.post("/", { schema: createFeedbackSchema }, async (req, reply) => {
    const { userId } = req.body;
    let ip = "undefined";
    if (userId) {
      const userFeedback = await Feedback.find({ userId });
      if (userFeedback[0]) {
        reply.conflict("User already submitted feedback");
      }
    }

    if (req.ip !== null && typeof req.ip !== "undefined") {
      ip = req.ip;
      const feedbackFromIp = await Feedback.find({ ipAddress: ip });
      if (feedbackFromIp[0]) {
        reply.conflict("Feedback already submitted with this IP address");
      }
    }

    if (userId || ip !== "undefined") {
      return new Feedback({
        ...req.body,
        ipAddress: ip,
      })
        .save()
        .then(() => {
          reply.code(201).send({ success: true });
        });
    }

    return reply.internalServerError(
      "Authenticated user or ip required to save feedback",
    );
  });
}

module.exports = routes;
