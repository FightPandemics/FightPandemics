const httpErrors = require("http-errors");

/*
 * /api/users
 */
async function routes(app) {
  const User = app.mongo.model("User");

  app.get(
    "/current",
    { preValidation: [app.authenticate] },
    async (req, reply) => {
      // todo: get current user from JWT
      const result = await User.findById("");
      if (result === null) {
        return reply.send(new httpErrors.NotFound());
      }
      return {
        id: result._id,
        firstName: result.firstName,
        lastName: result.firstName,
        email: result.email,
      };
    },
  );

  app.get(
    "/:userId",
    { preValidation: [app.authenticate] },
    async (req, reply) => {
      const result = await User.findById(req.params.userId);
      if (result === null) {
        return reply.send(new httpErrors.NotFound());
      }
      return {
        id: result._id,
        firstName: result.firstName,
        lastName: result.firstName,
      };
    },
  );
}

module.exports = routes;
