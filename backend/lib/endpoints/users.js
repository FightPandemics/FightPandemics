const { getUserByIdSchema } = require("./schema/users");

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
    "/signup/createProfile",
    async (req, reply) => {
      try {
        const { email, name, country, neighborhood } = req.body;
        console.log(email)
        console.log(name)
        console.log(country)
        console.log(neighborhood)
        return new User({
          "firstName": "myname",
          "email": "yay"
        }).save();
        // // // const newComment = await new Comment(req.body).save();
        // const updatedPost = await User.insert(
        //   { "email": email }
        // ).catch((err) => console.log(err));
        // return reply.code(204).send()
      } catch (err) {
        return reply.code(err.statusCode).send(err);
      }
    });
}

module.exports = routes;
