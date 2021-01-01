const { Social } = require("./Social");

// reference: https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/context
const authUrlBase = "https://www.linkedin.com/oauth/v2/authorization";
const tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";
const userDataUrl = "https://api.linkedin.com/v2/me";
const scopes = ["r_liteprofile", "r_emailaddress"].join(" "); // furture scope: "w_member_social"

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
    );
  }

  // reference: https://docs.microsoft.com/en-us/linkedin/shared/integrations/people/profile-api
  async getUserLink(accessToken) {
    const data = await super.getUserData(accessToken);
    return `www.linkedin.com/in/${data.vanityName}`;
  }
}

module.exports = { Linkedin };
