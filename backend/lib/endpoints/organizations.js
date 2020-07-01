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
      // TODO: make sure user can only delete organizations they own
      const result = await Organization.findByIdAndRemove(
        req.params.organizationId,
      );
      if (result === null) {
        return new httpErrors.NotFound();
      }
      return result;
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
    { schema: getOrganizationSchema },
    async (req) => {
      const result = await Organization.findById(req.params.organizationId);
      if (result === null) {
        return new httpErrors.NotFound();
      }
      return result;
    },
  );

  app.patch(
    "/:organizationId",
    {
      preValidation: [app.authenticate],
      schema: updateOrganizationSchema,
    },
    async (req) => {
      // TODO: make sure user can only update organizations they own
      const organization = await Organization.findById(
        req.params.organizationId,
      );
      if (organization === null) {
        return new httpErrors.NotFound();
      }

      console.log(req.body);
      const [updateErr, updatedOrg] = await app.to(
        Object.assign(organization, req.body).save(),
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
      return new Organization(req.body).save();
    },
  );
}

module.exports = routes;
