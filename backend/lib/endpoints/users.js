const Auth0 = require("../components/Auth0");
const { getBearerToken } = require("../utils");
const { getUserByIdSchema, createUserSchema } = require("./schema/users");

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
      lastName: result.lastName,
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
    "/",
    { preValidation: [app.authenticate], schema: createUserSchema },
    async (req) => {
      const user = await Auth0.getUser(getBearerToken(req));
      const { email_verified: emailVerified } = user;
      if (!emailVerified) {
        throw app.httpErrors.forbidden("Email address not verified");
      }
      const userData = {
        ...req.body,
        _id: req.userId,
      };
      return new User(userData).save();
    },
  );
}

module.exports = routes;
