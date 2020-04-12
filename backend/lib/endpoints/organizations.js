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
  const Organization = app.mongo.model("Organization");

  app.delete(
    "/:organizationId",
    {
      preValidation: [app.authenticate],
      schema: deleteOrganizationSchema,
    },
    async (req) => {
      // TODO: make sure user can only delete organizations they own
      return Organization.findByIdAndRemove(req.params.organizationId);
    },
  );

  app.get(
    "/",
    {
      preValidation: [app.authenticate],
      schema: getOrganizationsSchema,
    },
    async (req) => {
      const { ownerId } = req.params;
      const filter = ownerId ? { ownerId } : {};
      const sortedOrganizations = await Organization.find(filter).sort({
        name: 1,
      });
      return sortedOrganizations;
    },
  );

  app.get(
    "/:organizationId",
    {
      preValidation: [app.authenticate],
      schema: getOrganizationSchema,
    },
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
      Object.keys(req.body).forEach((key) => {
        if (organization[key] !== req.body[key]) {
          organization[key] = req.body[key];
        }
      });
      return organization.save();
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
