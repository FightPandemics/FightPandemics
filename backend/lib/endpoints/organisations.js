const httpErrors = require("http-errors");

const {
  createOrganisationSchema,
  deleteOrganisationSchema,
  getOrganisationSchema,
  getOrganisationsSchema,
  updateOrganisationSchema,
} = require("./schema/organisations");

/*
 * /api/organisations
 */
async function routes(app) {
  const Comment = app.mongo.model("Comment");
  const Organisation = app.mongo.model("OrganisationUser");
  const Post = app.mongo.model("Post");

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
        if (newOrgErr.name === "ValidationError" || newOrgErr.name === "MongoError") {
          throw app.httpErrors.conflict(
            "Email address is already in use or email address cannot be validated!",
          );
        } else {
          throw app.httpErrors.internalServerError();
        }
      }
      return newOrg;
    },
  );
}

module.exports = routes;
