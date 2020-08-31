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

      const ownerObjectId = app.mongo.base.Types.ObjectId(ownerId);
      await Promise.all([
        Organisation.findOne({
          name: body.name,
        }).exec(),
        Organisation.findOne({
          location: body.location,
          ownerId: ownerObjectId,
        }).exec(),
        Organisation.findOne({
          industry: body.industry,
          ownerId: ownerObjectId,
        }).exec(),
        Organisation.findOne({
          ownerId: ownerObjectId,
          type: body.type,
        }).exec(),
      ])
        .catch((err) => {
          req.log.error(err, "Failed creating organisation");
          throw app.httpErrors.internalServerError();
        })
        .then((validations) => {
          let conflict_message = new String();
          if (validations[0]) {
            conflict_message +=
              "An organisation with the same name already exists";
          }
          if (validations[1] || validations[2] || validations[3]) {
            if (validations[0]) conflict_message += ", and y";
            else conflict_message += "Y";
            conflict_message += "ou own an organization ";
            const identical_fields = [];
            if (validations[1]) identical_fields.push("in the same location");
            if (validations[2]) identical_fields.push(" of the same industry");
            if (validations[3]) identical_fields.push(" of the same type");
            conflict_message += `${identical_fields.join(",")}.`;
            conflict_message = conflict_message.replace(/,(?=[^,]*$)/, " and");
          } else if (validations[0]) {
            conflict_message += ".";
          }
          if (conflict_message != 0)
            throw app.httpErrors.conflict(conflict_message);
        });

      const [newOrgErr, newOrg] = await app.to(
        new Organisation({ ...body, ownerId }).save(),
      );

      if (newOrgErr) {
        req.log.error(newOrgErr, "Failed creating organisation");
        if (
          newOrgErr.name === "ValidationError" ||
          newOrgErr.name === "MongoError"
        ) {
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
