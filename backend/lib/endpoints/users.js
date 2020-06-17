const Auth0 = require("../components/Auth0");
const { getBearerToken } = require("../utils");
const {
  getUserByIdSchema,
  createUserSchema,
  updateUserSchema,
} = require("./schema/users");

/*
 * /api/users
 */
async function routes(app) {
  const Comment = app.mongo.model("Comment");
  const User = app.mongo.model("IndividualUser");
  const Post = app.mongo.model("Post");

  app.get("/current", { preValidation: [app.authenticate] }, async (req) => {
    const result = await User.findById(req.userId);
    if (result === null) {
      throw app.httpErrors.notFound();
    }
    const {
      _id: id,
      about,
      email,
      firstName,
      lastName,
      location,
      needs,
      objectives,
      urls,
    } = result;
    return {
      about,
      email,
      firstName,
      id,
      lastName,
      location,
      needs,
      objectives,
      urls,
    };
  });

  app.patch(
    "/current",
    { preValidation: [app.authenticate], schema: updateUserSchema },
    async (req) => {
      const { body, userId } = req;
      const [err, user] = await app.to(User.findById(userId));
      if (err) {
        req.log.error(err, `Failed retrieving user userId=${userId}`);
        throw app.httpErrors.internalServerError();
      } else if (user === null) {
        throw app.httpErrors.notFound();
      }
      const [updateErr, updatedUser] = await app.to(
        Object.assign(user, body).save(),
      );
      if (updateErr) {
        req.log.error(updateErr, "Failed updating user");
        throw app.httpErrors.internalServerError();
      }

      // -- Update Author References if needed
      const { firstName, lastName, photo } = body;
      if (firstName || lastName || photo) {
        const updateOps = {};
        if (firstName || lastName) {
          updateOps["author.name"] = updatedUser.name;
        }
        if (photo) {
          updateOps["author.photo"] = updatedUser.photo;
        }

        const [postErr] = await app.to(
          Post.updateMany(
            { "author.id": updatedUser._id },
            { $set: updateOps },
          ),
        );
        if (postErr) {
          req.log.error(postErr, "Failed updating author refs at posts");
        }

        const [commentErr] = await app.to(
          Comment.updateMany(
            { "author.id": updatedUser._id },
            { $set: updateOps },
          ),
        );
        if (commentErr) {
          req.log.error(commentErr, "Failed updating author refs at comments");
        }
      }
      return updatedUser;
    },
  );
}

module.exports = routes;
