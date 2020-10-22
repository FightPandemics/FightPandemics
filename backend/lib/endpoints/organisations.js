const httpErrors = require("http-errors");
const { uploadOrgAvatar } = require("../components/CDN");
const {
  createOrganisationAvatarSchema,
  createOrganisationSchema,
  deleteOrganisationSchema,
  getOrganisationSchema,
  getOrganisationsSchema,
  searchOrganisationsSchema,
  updateOrganisationSchema,
} = require("./schema/organisations");

/*
 * /api/organisations
 */
async function routes(app) {
  const Comment = app.mongo.model("Comment");
  const Organisation = app.mongo.model("OrganisationUser");
  const Post = app.mongo.model("Post");
  const User = app.mongo.model("IndividualUser");

  const ORGS_PAGE_SIZE = 10;

  app.get(
    "/search",
    {
      preValidation: [app.authenticateOptional],
      schema: searchOrganisationsSchema,
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
      const filters = [{ type: { $ne: "Individual" } }];

      // un-comment if user shouldnt find their owned organizations
      // if (userId) filters.push({ ownerId: { $ne: userId } });

      // prefer location from query filters, then user if authenticated
      let location;
      if (queryFilters.location) {
        location = queryFilters.location;
      } else if (user && !ignoreUserLocation) {
        location = user.location;
      }

      const objectives = {
        request: {
          $or: [
            { "needs.donations": true },
            { "needs.other": true },
            { "needs.staff": true },
            { "needs.volunteers": true },
          ],
        },
        // to add more in case orgs become able to offer help
      };

      if (objective) filters.push(objectives[objective]);

      // if location is defined, use simple regex text query, in order to use $geoNear
      if (location && keywords) {
        let cleanKeywords = keywords.replace(/[.*+?^${}()|[\]\\\.]/g, "\\$&");
        let isLatin = /^[a-zA-Z .*+?^${}()|[\]\\\.]+$/.test(cleanKeywords);
        const keywordsRegex = new RegExp(
          cleanKeywords
            .split(/[ \/,=$%#()-]/gi)
            .filter((key) => key && ((isLatin && key.length > 2) || (!isLatin && key.length > 1)))
            .map((key) => (isLatin && key.length <= 3 ? key + "\\b" : key))
            .join("|") || "\\b\\B",
          "ig",
        );
        filters.push({
          $or: [
            { name: keywordsRegex },
            { firstName: keywordsRegex },
            { lastName: keywordsRegex },
            { about: keywordsRegex },
            { type: keywordsRegex },
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
                $limit: limit || ORGS_PAGE_SIZE,
              },
            ];

      /* eslint-disable sort-keys */
      const projectionSteps = [
        {
          $project: {
            _id: true,
            about: true,
            name: true,
            type: true,
            urls: true,
            needs: true,
            industry: true,
            global: true,
            location: true,
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
      const totalResultsAggregationPipeline = await Organisation.aggregate(
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

      const [organisationsErr, organisations] = await app.to(
        Organisation.aggregate(aggregationPipelineResults),
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

      if (organisationsErr) {
        req.log.error(organisationsErr, "Failed requesting users");
        throw app.httpErrors.internalServerError();
      } else if (organisations === null) {
        return responseHandler([]);
      } else {
        return responseHandler(organisations);
      }
    },
  );

  app.delete(
    "/:organisationId",
    {
      preValidation: [app.authenticate],
      schema: deleteOrganisationSchema,
    },
    async (req) => {
      const {
        params: { organisationId },
        userId,
      } = req;
      const [orgErr, org] = await app.to(Organisation.findById(organisationId));
      if (orgErr) {
        req.log.error(orgErr, "Failed retrieving organisation");
        throw app.httpErrors.internalServerError();
      } else if (org === null) {
        throw app.httpErrors.notFound();
      } else if (!org.ownerId.equals(userId)) {
        req.log.error("User not allowed to delete this organisation");
        throw app.httpErrors.forbidden();
      }
      const [deleteOrgErr, deletedOrganisation] = await app.to(org.delete());
      if (deleteOrgErr) {
        req.log.error(deleteOrgErr, "Failed deleting organisation");
        throw app.httpErrors.internalServerError();
      }
      return { deletedOrganisation, success: true };
    },
  );

  app.get("/", { schema: getOrganisationsSchema }, async (req) => {
    const { ownerId } = req.params;
    const filter = ownerId ? { ownerId } : {};
    const sortedOrganisations = await Organisation.find(filter).sort({
      name: 1,
    });
    return sortedOrganisations;
  });

  app.get(
    "/:organisationId",
    {
      preValidation: [app.authenticateOptional],
      schema: getOrganisationSchema,
    },
    async (req) => {
      const {
        params: { organisationId },
        userId,
      } = req;

      const result = await Organisation.findById(organisationId);
      if (result === null) {
        return new httpErrors.NotFound();
      }
      return {
        ...result.toObject(),
        isOwner: userId !== null && userId.equals(result.ownerId),
      };
    },
  );

  app.patch(
    "/:organisationId",
    {
      preValidation: [app.authenticate],
      schema: updateOrganisationSchema,
    },
    async (req) => {
      const {
        params: { organisationId },
        userId,
      } = req;
      const [orgErr, org] = await app.to(Organisation.findById(organisationId));
      if (orgErr) {
        req.log.error(orgErr, "Failed retrieving organisation");
        throw app.httpErrors.internalServerError();
      } else if (org === null) {
        throw app.httpErrors.notFound();
      } else if (!org.ownerId.equals(userId)) {
        req.log.error("User not allowed to update this organisation");
        throw app.httpErrors.forbidden();
      }

      const [updateErr, updatedOrg] = await app.to(
        Object.assign(org, req.body).save(),
      );
      if (updateErr) {
        if (
          updateErr.name === "ValidationError" ||
          updateErr.name === "MongoError"
        ) {
          throw app.httpErrors.conflict(
            "Email address is already in use or email address cannot be validated!",
          );
        }
        req.log.error(updateErr, "Failed updating organisation");
        throw app.httpErrors.internalServerError();
      }

      // -- Update Author References if needed
      const { name, photo, type } = req.body;
      if (name || photo || type) {
        const updateOps = {};
        if (name) {
          updateOps["author.name"] = updatedOrg.name;
        }
        if (photo) {
          updateOps["author.photo"] = updatedOrg.photo;
        }
        if (type) {
          updateOps["author.type"] = updatedOrg.type;
        }

        const [postErr] = await app.to(
          Post.updateMany({ "author.id": updatedOrg._id }, { $set: updateOps }),
        );
        if (postErr) {
          req.log.error(postErr, "Failed updating author refs at posts");
        }

        const [commentErr] = await app.to(
          Comment.updateMany(
            { "author.id": updatedOrg._id },
            { $set: updateOps },
          ),
        );
        if (commentErr) {
          req.log.error(commentErr, "Failed updating author refs at comments");
        }
      }

      return updatedOrg;
    },
  );

  app.post(
    "/",
    {
      preValidation: [app.authenticate],
      schema: createOrganisationSchema,
    },
    async (req) => {
      const { body, userId: ownerId } = req;
      const [newOrgErr, newOrg] = await app.to(
        new Organisation({ ...body, ownerId }).save(),
      );

      if (newOrgErr) {
        req.log.error(newOrgErr, "Failed creating organisation");
        if (
          newOrgErr.name === "ValidationError" ||
          newOrgErr.name === "MongoError"
        ) {
          throw app.httpErrors.conflict("emailIssue");
        } else {
          throw app.httpErrors.internalServerError();
        }
      }
      return newOrg;
    },
  );

  app.post(
    "/:organisationId/avatar",
    {
      preValidation: [app.authenticate],
      schema: createOrganisationAvatarSchema,
    },
    async (req) => {
      const file = req.raw.files.file;
      const organisationId = req.params.organisationId;
      const userId = req.userId;

      const [err, org] = await app.to(Organisation.findById(organisationId));
      if (err) {
        req.log.error(
          err,
          `Failed retrieving organisation organisationId=${organisationId}`,
        );
        throw app.httpErrors.internalServerError();
      } else if (org === null) {
        throw app.httpErrors.notFound();
      } else if (!org.ownerId.equals(userId)) {
        req.log.error("User not allowed to update this organisation");
        throw app.httpErrors.forbidden();
      }
      try {
        const avatarUrl = await uploadOrgAvatar(organisationId, file);
        org.photo = avatarUrl;
        const [updateErr, updatedOrg] = await app.to(org.save());
        if (updateErr) {
          req.log.error(updateErr, "Failed updating organisation");
          throw app.httpErrors.internalServerError();
        }

        // -- Update Author photo references if needed
        const updateOps = {
          "author.photo": updatedOrg.photo,
        };
        const [postErr] = await app.to(
          Post.updateMany({ "author.id": updatedOrg._id }, { $set: updateOps }),
        );
        if (postErr) {
          req.log.error(postErr, "Failed updating author photo refs at posts");
        }

        const [commentErr] = await app.to(
          Comment.updateMany(
            { "author.id": updatedOrg._id },
            { $set: updateOps },
          ),
        );
        if (commentErr) {
          req.log.error(commentErr, "Failed updating author photo refs at comments");
        }

        return updatedOrg;
      } catch (error) {
        req.log.error(error, "Failed updating organisation avatar.");
        throw app.httpErrors.internalServerError();
      }
    },
  );
}

module.exports = routes;
