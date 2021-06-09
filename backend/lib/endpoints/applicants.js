const mongoose = require("mongoose");
const moment = require("moment");

const {
  getApplicantByIdSchema,
  getApplicantsSchema,
  createApplicantSchema,
  updateApplicantStatusSchema,
  getOrganizationApplicantsSchema
} = require("../endpoints/schema/applicants");
const { setElapsedTimeText } = require("../utils");

/*
 * /api/applicants
 */
async function routes(app) {
  const Applicant = app.mongo.model("Applicants");
  const User = app.mongo.model("IndividualUser");
  const Organization = app.mongo.model("OrganisationUser");

  const APPLICANT_PAGE_SIZE = 10;

  app.get(
    "/:applicantId",
    {
      preValidation: [app.authenticateOptional, app.setActor],
      schema: getApplicantByIdSchema
    },
    async (req) => {
      const {
        params: { applicantId },
      } = req;

      const [applicantErr, applicant] = await app.to(
        Applicant.findById(applicantId)
      );

      if (applicantErr) {
        if (applicantErr instanceof mongoose.Error.CastError) {
          req.log.error(applicantErr, "Can't find a applicant with the given id.");
          throw app.httpErrors.badRequest();
        }
        throw app.httpErrors.internalServerError();
      }


      else if (applicant == null) {
        throw app.httpErrors.notFound();
      }

      return {
        ...applicant.toObject()
      };
    }
  );

  app.get(
    "/:organizationId/organisationApplicants",
    {
      preValidation: [app.authenticateOptional, app.setActor],
      schema: getOrganizationApplicantsSchema
    },
    async (req) => {
      const {
        params: { organizationId },
        query: { status }
      } = req;

      const [applicantErr, applicant] = await app.to(
        Applicant.findById(organizationId)
      );

      if (applicantErr) {
        if (applicantErr instanceof mongoose.Error.CastError) {
          req.log.error(applicantErr, "Can't find a applicant with the given id.");
          throw app.httpErrors.badRequest();
        }
        throw app.httpErrors.internalServerError();
      }
      else if (applicant == null) {
        throw app.httpErrors.notFound();
      }

      return {
        ...applicant.toObject()
      };
    }
  );
  // TODO - CHANGE ALL userId variables to mongoose.Types.ObjectId(userId)
  app.get(
    "/",
    // TODO - change authenticateOptional to authenticate
    {
      preValidation: [app.authenticateOptional],
      schema: getApplicantsSchema
    },
    async (req) => {
      const { limit, skip, organizationId, includeMeta, permissions, userId, status } = req.query;
      const [applicantsErr, applicants] = await app.to(
        Applicant.aggregate(
          [
            {
              $match:
              {
                $and: [
                  organizationId ?
                    {
                      "organization.id": mongoose.Types.ObjectId(organizationId)
                    } : {},
                  userId ?
                    { "applicant.id": mongoose.Types.ObjectId(userId) } : {},
                  status ?
                    { status: status } : {},
                ]
              }
            },
            {
              $lookup: {
                "from": "users",
                "localField": "organization.id",
                "foreignField": "_id",
                "as": "orgInfo"
              }
            },
            {
              $lookup: {
                "from": "users",
                "localField": "applicant.id",
                "foreignField": "_id",
                "as": "userInfo"
              }
            },
            {
              $set: {
                orgInfo: { $arrayElemAt: ["$orgInfo", 0] },
                userInfo: { $arrayElemAt: ["$userInfo", 0] },
              }
            },
            {
              $skip: parseInt(skip, 10) || 0,
            },
            {
              $limit: parseInt(limit, 10) || APPLICANT_PAGE_SIZE
            }
          ]


        ).then((applicants) => {
          applicants.forEach((applicant) => {
            applicant.elapsedTimeText = setElapsedTimeText(
              applicant.createdAt,
              applicant.updatedAt
            );
          });
          return applicants;
        })
      );

      const totalResultsAggregationPipeline = await Applicant.aggregate(
        [
          {
            $match:
            {
              $and: [
                organizationId ?
                  {
                    "organization.id": mongoose.Types.ObjectId(organizationId)
                  } : {},
                userId ?
                  { "applicant.id": mongoose.Types.ObjectId(userId) } : {},
                status ?
                  { status: status } : {},
              ]
            }
          },
          { $group: { _id: null, count: { $sum: 1 } } }
        ]
      );
      const applicantsResponse = (response) => {
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

      if (applicantsErr) {
        req.log.error(applicantsErr, "Failed requesting applicants");
        throw app.httpErrors.internalServerError();
      }
      else if (applicants === null) {
        return applicantsResponse([]);
      }
      else {
        return applicantsResponse(applicants);
      }

    }
  );

  // Applicants for orgasniation
  app.get(
    "/:organizationId/status",
    // TODO - change authenticateOptional to authenticate
    {
      preValidation: [app.authenticateOptional],
      schema: getOrganizationApplicantsSchema
    },
    async (req) => {
      const {
        params: { organizationId },
        query: {
          limit,
          skip,
          includeMeta,
          permissions,
          userId,
          status
        },
      } = req;
      const [applicantsErr, applicants] = await app.to(

        Applicant.aggregate(
          [
            {
              $match: {
                $and: [
                  { "organization.id": mongoose.Types.ObjectId(organizationId) },
                  status ? { status: status } : {},
                  permissions ? { "organization.permissions": permissions } : {},
                  userId ? { "applicant.id": mongoose.Types.ObjectId(userId) }
                    : {}
                ]
              }
            },
            {
              $skip: parseInt(skip, 10) || 0,
            },
            {
              $limit: parseInt(limit, 10) || APPLICANT_PAGE_SIZE
            },
          ]
        ).then((applicants) => {
          applicants.forEach((applicant) => {
            applicant.elapsedTimeText = setElapsedTimeText(
              applicant.createdAt,
              applicant.updatedAt
            );
          });
          return applicants;
        })
      );

      const totalResultsAggregationPipeline = await Applicant.aggregate(
        [
          {
            $match: {
              $and: [
                { "organization.id": mongoose.Types.ObjectId(organizationId) },
                status ? { status: status } : {},
                permissions ? { "organization.permissions": permissions } : {},
                userId ? { "applicant.id": mongoose.Types.ObjectId(userId) } : {}
              ]
            }
          },
          { $group: { _id: null, count: { $sum: 1 } } }
        ]

      );
      const applicantsResponse = (response) => {
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
      if (applicantsErr) {
        req.log.error(applicantsErr, "Failed requesting applicants");
        throw app.httpErrors.internalServerError();
      }
      else if (applicants === null) {
        return applicantsResponse([]);
      }
      else {
        return applicantsResponse(applicants);
      }

    }
  );

  app.post(
    "/",
    // TODO - change authenticateOptional to authenticate
    {
      preValidation: [app.authenticateOptional, app.setActor],
      schema: createApplicantSchema,
    },
    async (req, reply) => {
      const { actor, body: applicantProps } = req;

      //Creates the embeded author document
      applicantProps.applicant = {
        id: mongoose.Types.ObjectId(actor.id),
        location: actor.location,
        name: actor.name,
        photo: actor.photo,
        type: actor.type,
        verified: actor.verification && actor.verification.status === "approved",
      };


      const [err, applicant] = await app.to(new Applicant(applicantProps).save());

      if (err) {
        req.log.error(err, "Failed creating applicant organisation.");
        throw app.httpErrors.internalServerError();
      }

      const organizationId = applicant.organization.id;

      const [errOrg, organisation] = await app.to(Organization.findById(organizationId));

      if (errOrg) {
        req.log.error(errOrg, "Failed to find organisation with id=" + organizationId + " applied by applicant.");
        throw app.httpErrors.internalServerError();
      }

      const receiverId = organisation.ownerId;
      const triggeredById = applicant.applicant.id;

      const [errUser, owner] = await app.to(User.findById(receiverId));

      if (errUser) {
        req.log.error(errUser, "Failed to find user with id=" + receiverId);
        throw app.httpErrors.internalServerError();
      }

      if (owner.notifyPrefs.instant.newapplicant === true) {
        app.notifier.notifyNewApplicant("newapplicant", organisation, triggeredById, receiverId);
      } else {
        console.log("Notification Preference for new applicant is turned off");
      }

      app.notifier.notifyNewApplicant("applicationSubmitted", organisation, triggeredById, triggeredById);

      reply.code(201);
      return {
        ...applicant.toObject(),
      };

    }
  );
  app.patch(
    "/:applicantId",
    {
      // TODO - change authenticateOptional to authenticate
      preValidation: [app.authenticateOptional],
      schema: updateApplicantStatusSchema
    },
    async (req) => {
      const {
        body: { status },
        params: { applicantId },
        query: { permissions }
      } = req;
      const [updateErr, updateApplicant] = await app.to(
        Applicant.findOneAndUpdate(
          { _id: applicantId },
          {
            status: status,
            "organization.permissions": permissions
          }
        ),
      );
      if (updateErr) {
        if (updateErr.name === "ValidationError" ||
          updateErr.name === "MongoError"
        ) {
          throw app.httpErrors.conflict("Validation error.");
        }
        req.log.error(updateErr, "Failed updating applicant status.");
        throw app.httpErrors.internalServerError();
      }

      return updateApplicant;
    }
  );

};

module.exports = routes;