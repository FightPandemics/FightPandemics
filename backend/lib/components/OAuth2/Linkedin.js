const { Social } = require("./Social");

// reference: https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/context
const authUrlBase = "https://www.linkedin.com/oauth/v2/authorization";
const tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";
const userDataUrl = "https://api.linkedin.com/v2/me";
// TODO: linkedin need request scopes for 'r_basicprofile'
const scopes = ["r_basicprofile", "r_emailaddress"].join(","); // furture scope: "w_member_social"
const extraFields = { grant_type: "authorization_code" }; // needed for authentication

class Linkedin extends Social {
  constructor(clientId, secretKey) {
    super(
      "linkedin",
      clientId,
      secretKey,
      authUrlBase,
      tokenUrl,
      userDataUrl,
      scopes,
      extraFields,
    );
  }

  // reference: https://docs.microsoft.com/en-us/linkedin/shared/integrations/people/profile-api
  async getUserLink(accessToken) {
    const data = await super.getUserData(accessToken);
    return `www.linkedin.com/in/${data.vanityName}`;
  }
}

module.exports = { Linkedin };
