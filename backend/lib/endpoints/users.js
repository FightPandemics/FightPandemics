const httpErrors = require("http-errors");

const { getUserByIdSchema } = require("./schema/users");

/*
 * /api/users
 */
async function routes(app) {
  const User = app.mongo.model("User");

  app.get("/current", { preValidation: [app.authenticate] }, async () => {
    // todo: get current user from JWT
    const result = await User.findById("");
    if (result === null) {
      return new httpErrors.NotFound();
    }
    return {
      email: result.email,
      firstName: result.firstName,
      id: result._id,
      lastName: result.firstName,
    };
  });

  app.get(
    "/:userId",
    { preValidation: [app.authenticate], schema: getUserByIdSchema },
    async (req) => {
      const result = await User.findById(req.params.userId);
      if (result === null) {
        return new httpErrors.NotFound();
      }
      return {
        firstName: result.firstName,
        id: result._id,
        lastName: result.firstName,
      };
    },
  );
}

module.exports = routes;
