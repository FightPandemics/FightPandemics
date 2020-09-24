const Auth0 = require("../components/Auth0");
const { uploadUserAvatar } = require("../components/CDN");
const { getCookieToken } = require("../utils");
const {
  getUserByIdSchema,
  createUserAvatarSchema,
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
    const { userId } = req;
    const [userErr, user] = await app.to(
      User.findById(userId).populate("organisations"),
    );
    if (userErr) {
      req.log.error(userErr, "Failed retrieving user");
      throw app.httpErrors.internalServerError();
    } else if (user === null) {
      req.log.error(userErr, "User does not exist");
      throw app.httpErrors.notFound();
    }

    const {
      _id: id,
      about,
      email,
      firstName,
      hide,
      lastName,
      location,
      needs,
      objectives,
      organisations,
      urls,
      photo,
    } = user;
    return {
      about,
      email,
      firstName,
      hide,
      id,
      lastName,
      location,
      needs,
      objectives,
      organisations,
      photo,
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

  app.get(
    "/:userId",
    {
      preValidation: [app.authenticateOptional],
      schema: getUserByIdSchema,
    },
    async (req) => {
      const {
        params: { userId },
        userId: authUserId,
      } = req;

      const user = await User.findById(userId).populate("organisations");
      if (user === null) {
        throw app.httpErrors.notFound();
      }

      const {
        about,
        firstName,
        hide,
        id,
        lastName,
        needs,
        organisations,
        objectives,
        photo,
        urls,
      } = user;

      let { location } = user;

      // never reveal user's email, coordinates in profile
      delete location.coordinates;

      if (hide.address) {
        location = {};
      }

      return {
        about,
        firstName,
        id,
        lastName,
        location,
        needs,
        organisations,
        objectives,
        ownUser: authUserId !== null && authUserId.equals(user.id),
        photo,
        urls,
      };
    },
  );

  app.post(
    "/:userId/avatar",
    { preValidation: [app.authenticate], schema: createUserAvatarSchema },
    async (req) => {
      const { file } = req.raw.files;
      const { userId } = req.params;

      const [err, user] = await app.to(User.findById(userId));
      if (err) {
        req.log.error(err, `Failed retrieving user userId=${userId}`);
        throw app.httpErrors.internalServerError();
      } else if (user === null) {
        throw app.httpErrors.notFound();
      }
      try {
        const avatarUrl = await uploadUserAvatar(userId, file);
        user.photo = avatarUrl;
        const [updateErr, updatedUser] = await app.to(user.save());
        if (updateErr) {
          req.log.error(updateErr, "Failed updating user");
          throw app.httpErrors.internalServerError();
        }
        return {
          updatedUser
        };
      } catch (error) {
        req.log.error(error, "Failed updating user avatar.");
        throw app.httpErrors.internalServerError();
      }
    },
  );

  app.post(
    "/",
    { preValidation: [app.authenticate], schema: createUserSchema },
    async (req) => {
      const user = await Auth0.getUser(getCookieToken(req));
      const { email, email_verified: emailVerified } = user;
      if (!emailVerified) {
        throw app.httpErrors.forbidden("Email address not verified");
      }
      if (!req.userId) {
        req.log.error(
          `No userId for create user ${email}, invalid configuration`,
        );
        throw app.httpErrors.internalServerError();
      }
      if (await User.findById(req.userId)) {
        throw app.httpErrors.conflict("User exists");
      }
      const userData = {
        ...req.body,
        _id: req.userId,
        authId: req.user.sub,
        email,
      };
      return new User(userData).save();
    },
  );
}

module.exports = routes;
