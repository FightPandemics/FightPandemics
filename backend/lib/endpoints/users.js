const { getUserByIdSchema, createProfileSchema } = require("./schema/users");

/*
 * /api/users
 */
async function routes(app) {
  const User = app.mongo.model("User");

  app.get("/current", { preValidation: [app.authenticate] }, async (req) => {
    const result = await User.findById(req.userId);
    if (result === null) {
      throw app.httpErrors.notFound();
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
      const user = await User.findById(req.params.userId);
      if (user === null) {
        throw app.httpErrors.notFound();
      }
      const { firstName, lastName, _id: id } = user;
      return {
        firstName,
        id,
        lastName,
      };
    },
  );

  app.post(
    "/:userId",
    { preValidation: [app.authenticate], schema: createProfileSchema },
    async (req, reply) => {
      try {
        return new User(req.body).save();
      } catch (err) {
        return reply.code(err.statusCode).send(err);
      }
    });
}

module.exports = routes;
