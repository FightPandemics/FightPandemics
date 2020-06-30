const httpErrors = require("http-errors");

const {
  createOrganizationSchema,
  deleteOrganizationSchema,
  getOrganizationSchema,
  getOrganizationsSchema,
  updateOrganizationSchema,
} = require("./schema/organizations");

/*
 * /api/organizations
 */
async function routes(app) {
  const Comment = app.mongo.model("Comment");
  const Organization = app.mongo.model("OrganizationUser");
  const Post = app.mongo.model("Post");

  app.delete(
    "/:organizationId",
    {
      preValidation: [app.authenticate],
      schema: deleteOrganizationSchema,
    },
    async (req) => {
      const {
        params: { organizationId },
        userId,
      } = req;
      const [orgErr, org] = await app.to(Organization.findById(organizationId));
      if (orgErr) {
        req.log.error(orgErr, "Failed retrieving organization");
        throw app.httpErrors.internalServerError();
      } else if (org == null) {
        throw app.httpErrors.notFound();
      } else if (!org.ownerId.equals(userId)) {
        req.log.error("User not allowed to delete this organization");
        throw app.httpErrors.forbidden();
      }
      const [deleteOrgErr, deletedOrganization] = await app.to(org.delete());
      if (deleteOrgErr) {
        req.log.error(deleteOrgErr, "Failed deleting organization");
        throw app.httpErrors.internalServerError();
      }
      return { deletedOrganization, success: true };
    },
  );

  app.get("/", { schema: getOrganizationsSchema }, async (req) => {
    const { ownerId } = req.params;
    const filter = ownerId ? { ownerId } : {};
    const sortedOrganizations = await Organization.find(filter).sort({
      name: 1,
    });
    return sortedOrganizations;
  });

  app.get(
    "/:organizationId",
    {
      preValidation: [app.authenticateOptional],
      schema: getOrganizationSchema,
    },
    async (req) => {
      const {
        params: { organizationId },
        userId,
      } = req;

      const result = await Organization.findById(organizationId);
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
    "/:organizationId",
    {
      preValidation: [app.authenticate],
      schema: updateOrganizationSchema,
    },
    async (req) => {
      const {
        params: { organizationId },
        userId,
      } = req;
      const [orgErr, org] = await app.to(Organization.findById(organizationId));
      if (orgErr) {
        req.log.error(orgErr, "Failed retrieving organization");
        throw app.httpErrors.internalServerError();
      } else if (org == null) {
        throw app.httpErrors.notFound();
      } else if (!org.ownerId.equals(userId)) {
        req.log.error("User not allowed to update this organization");
        throw app.httpErrors.forbidden();
      }

      const [updateErr, updatedOrg] = await app.to(
        Object.assign(org, req.body).save(),
      );
      if (updateErr) {
        req.log.error(updateErr, "Failed updating organization");
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
      schema: createOrganizationSchema,
    },
    async (req) => {
      const { body, userId: ownerId } = req;
      return new Organization({ ...body, ownerId }).save();
    },
  );
}

module.exports = routes;
