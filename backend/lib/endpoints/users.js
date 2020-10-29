const Auth0 = require("../components/Auth0");
const { uploadUserAvatar } = require("../components/CDN");
const { getCookieToken, createSearchRegex } = require("../utils");
const {
  getUserByIdSchema,
  getUsersSchema,
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

  const USERS_PAGE_SIZE = 10;

  app.get(
    "/",
    {
      preValidation: [app.authenticateOptional],
      schema: getUsersSchema,
    },
    async (req) => {
      const { query, userId } = req;
      const {
        ignoreUserLocation,
        filter,
        keywords,
        limit,
        objective,
        skip,
        includeMeta,
      } = query;
      const queryFilters = filter ? JSON.parse(decodeURIComponent(filter)) : {};
      let user;
      let userErr;
      if (userId) {
        [userErr, user] = await app.to(User.findById(userId));
        if (userErr) {
          req.log.error(userErr, "Failed retrieving user");
          throw app.httpErrors.internalServerError();
        } else if (user === null) {
          req.log.error(userErr, "User does not exist");
          throw app.httpErrors.forbidden();
        }
      }

      /* eslint-disable sort-keys */
      const filters = [{ type: "Individual" }];

      // prefer location from query filters, then user if authenticated
      let location;
      if (queryFilters.location) {
        location = queryFilters.location;
      } else if (user && !ignoreUserLocation) {
        location = user.location;
      }

      if (queryFilters.location) filters.push({ "hide.address": false });

      const objectives = {
        request: {
          $or: [{ "needs.medicalHelp": true }, { "needs.otherHelp": true }],
        },
        offer: {
          $or: [
            { "objectives.donate": true },
            { "objectives.shareInformation": true },
            { "objectives.volunteer": true },
          ],
        },
      };

      if (objective) filters.push(objectives[objective]);

      // if location is defined, use simple regex text query, in order to use $geoNear
      if (location && keywords) {
        const keywordsRegex = createSearchRegex(keywords)
        filters.push({
          $or: [
            { name: keywordsRegex },
            { firstName: keywordsRegex },
            { lastName: keywordsRegex },
            { about: keywordsRegex },
          ],
        });
      }

      /* eslint-disable sort-keys */
      const sortAndFilterSteps = location
        ? [
            {
              $geoNear: {
                distanceField: "distance",
                key: "location.coordinates",
                near: {
                  $geometry: {
                    coordinates: location.coordinates,
                    type: "Point",
                  },
                },
                query: { $and: filters },
              },
            },
            { $sort: { distance: 1, _id: -1 } },
          ]
        : keywords
        ? [
            { $match: { $and: filters, $text: { $search: keywords } } },
            { $sort: { score: { $meta: "textScore" } } },
          ]
        : [{ $match: { $and: filters } }, { $sort: { _id: -1 } }];

      /* eslint-disable sort-keys */
      const paginationSteps =
        limit === -1
          ? [
              {
                $skip: skip || 0,
              },
            ]
          : [
              {
                $skip: skip || 0,
              },
              {
                $limit: limit || USERS_PAGE_SIZE,
              },
            ];

      /* eslint-disable sort-keys */
      const projectionSteps = [
        {
          $project: {
            _id: true,
            about: true,
            firstName: true,
            lastName: true,
            type: true,
            "hide.address": true,
            location: { $cond: ["$hide.address", null, "$location"] },
            urls: true,
            objectives: true,
            needs: true,
            photo: true,
          },
        },
      ];
      /* eslint-enable sort-keys */
      const aggregationPipelineResults = [
        ...sortAndFilterSteps,
        ...paginationSteps,
        ...projectionSteps,
      ];

      // Get the total results without pagination steps but with filtering aplyed - totalResults
      /* eslint-disable sort-keys */
      const totalResultsAggregationPipeline = await User.aggregate(
        keywords && !location
          ? [
              { $match: { $and: filters, $text: { $search: keywords } } },
              { $group: { _id: null, count: { $sum: 1 } } },
            ]
          : [
              { $match: { $and: filters } },
              { $group: { _id: null, count: { $sum: 1 } } },
            ],
      );

      const [usersErr, users] = await app.to(
        User.aggregate(aggregationPipelineResults),
      );

      const responseHandler = (response) => {
        if (!includeMeta) {
          return response;
        }
        return {
          meta: {
            total: totalResultsAggregationPipeline.length
              ? totalResultsAggregationPipeline[0].count
              : 0,
          },
          data: response,
        };
      };

      if (usersErr) {
        req.log.error(usersErr, "Failed requesting users");
        throw app.httpErrors.internalServerError();
      } else if (users === null) {
        return responseHandler([]);
      } else {
        return responseHandler(users);
      }
    },
  );

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
      usesPassword,
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
      usesPassword,
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
        usesPassword
      } = user;

      let { location } = user;

      // never reveal user's email, coordinates in profile
      delete location.coordinates;

      if (hide.address) {
        location = {};
      }
      const ownUser = authUserId !== null && authUserId.equals(user.id);
      return {
        about,
        firstName,
        id,
        lastName,
        location,
        needs,
        organisations,
        objectives,
        ownUser,
        photo,
        urls,
        usesPassword: ownUser ? usesPassword : undefined
      };
    },
  );

  app.post(
    "/current/avatar",
    { preValidation: [app.authenticate], schema: createUserAvatarSchema },
    async (req) => {
      const { file } = req.raw.files;
      const { userId } = req;

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

        // -- Update Author photo references if needed
        const updateOps = {
          "author.photo": updatedUser.photo,
        };
        const [postErr] = await app.to(
          Post.updateMany(
            { "author.id": updatedUser._id },
            { $set: updateOps },
          ),
        );
        if (postErr) {
          req.log.error(postErr, "Failed updating author photo refs at posts");
        }

        const [commentErr] = await app.to(
          Comment.updateMany(
            { "author.id": updatedUser._id },
            { $set: updateOps },
          ),
        );
        if (commentErr) {
          req.log.error(commentErr, "Failed updating author photo refs at comments");
        }

        return {
          updatedUser,
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
        throw app.httpErrors.forbidden("emailUnverified");
      }
      if (!req.userId) {
        req.log.error(
          `No userId for create user ${email}, invalid configuration`,
        );
        throw app.httpErrors.internalServerError();
      }
      if (await User.findById(req.userId)) {
        throw app.httpErrors.conflict("userExists");
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
