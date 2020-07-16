const { schema: userSchema } = require("../../lib/models/User");
const {
  schema: individualUserSchema,
} = require("../../lib/models/IndividualUser");
const {
  schema: organisationUserSchema,
} = require("../../lib/models/OrganisationUser");

// generic location with required elements
const SOURCED_BY_FP_LOCATION = {
  address: "Worldwide",
  coordinates: [0, 0],
};

const SOURCED_BY_FP_OWNER_FILTER = {
  // don't update email post-launch
  email: "admin@fightpandemics.com",
};

const SOURCED_BY_FP_OWNER_UPDATE = {
  // can be updated post-launch
  about: "For posts sourced by FightPandemics",
  authId: "NA",
  firstName: "Sourced by",
  lastName: "FightPandemics",
  location: SOURCED_BY_FP_LOCATION,
  photo:
    "https://raw.githubusercontent.com/FightPandemics/FightPandemics/master/images/fp_logo.png",
};

const SOURCED_BY_FP_ORG_UPDATE = {
  global: true,
  industry: "Non-profit",
  language: "English",
  location: SOURCED_BY_FP_LOCATION,
};

// simple slugify so we have unique email in Users collection
const slugifySourcedByFPOrgEmail = (orgType) => {
  return `sourcedby-type-${orgType
    .replace(/\W/g, "-")
    .toLowerCase()}@fightpandemics.com`;
};

const initSourcedByFPOwner = async (connection) => {
  const User = connection.model("User", userSchema);
  const IndividualUser = User.discriminator(
    "IndividualUser",
    individualUserSchema,
  );
  const sourcedByFPOwner = await IndividualUser.findOne(
    SOURCED_BY_FP_OWNER_FILTER,
  );

  if (sourcedByFPOwner) {
    // already exists? update & return id
    Object.keys(SOURCED_BY_FP_OWNER_UPDATE).forEach((key) => {
      if (sourcedByFPOwner[key] !== SOURCED_BY_FP_OWNER_UPDATE[key]) {
        sourcedByFPOwner[key] = SOURCED_BY_FP_OWNER_UPDATE[key];
      }
    });
    return sourcedByFPOwner.save();
  }

  return new IndividualUser({
    ...SOURCED_BY_FP_OWNER_FILTER,
    ...SOURCED_BY_FP_OWNER_UPDATE,
  }).save();
};

// Returns [{ type: OrgDoc }] to associate posts with the correct author.type
const initSourcedByFPOrgs = async (connection, sourcedByFPOwner) => {
  const User = connection.model("User", userSchema);
  const OrganisationUser = User.discriminator(
    "OrganisationUser",
    organisationUserSchema,
  );

  /*
    Need to create one Sourced by FP Org per organisation.type enum
    Since all post author.type references updated whenver the author type is updated
  */
  const fpOrgsByType = {};
  /* eslint-disable-next-line no-restricted-syntax */
  for await (const orgType of organisationUserSchema.tree.type.enum) {
    const orgFilter = {
      ownerId: sourcedByFPOwner._id,
      type: orgType,
    };
    const orgUpdate = {
      ...SOURCED_BY_FP_ORG_UPDATE,
      email: slugifySourcedByFPOrgEmail(orgType),
      name: `${sourcedByFPOwner.name} (${orgType})`,
      photo: sourcedByFPOwner.photo,
    };

    let sourcedByFPOrg;
    sourcedByFPOrg = await OrganisationUser.findOne(orgFilter);
    if (sourcedByFPOrg) {
      Object.keys(orgUpdate).forEach((key) => {
        if (sourcedByFPOrg[key] !== orgUpdate[key]) {
          sourcedByFPOrg[key] = orgUpdate[key];
        }
      });
      await sourcedByFPOrg.save();
    } else {
      sourcedByFPOrg = await new OrganisationUser({
        ...orgFilter,
        ...orgUpdate,
      }).save();
    }
    fpOrgsByType[orgType] = sourcedByFPOrg;
  }
  return fpOrgsByType;
};

module.exports = async (connection) => {
  const sourcedByFPOwner = await initSourcedByFPOwner(connection);
  return initSourcedByFPOrgs(connection, sourcedByFPOwner);
};
