const { Social } = require("./Social");

// reference: https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/context

class Linkedin extends Social {
  constructor(clientId, secretKey) {
    super(clientId, secretKey);
    this.socialType = "linkedin";
    this.authUrlBase = "https://www.linkedin.com/oauth/v2/authorization";
    this.tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";
    this.userDataUrl = "https://api.linkedin.com/v2/me";
    this.scopes = ["r_liteprofile", "r_emailaddress"].join(" "); // furture scope: "w_member_social"
  }

  // reference: https://docs.microsoft.com/en-us/linkedin/shared/integrations/people/profile-api
  async getUserLink(accessToken) {
    const data = await super.getUserData(accessToken);
    return `www.linkedin.com/in/${data.vanityName}`;
  }
}

module.exports = { Linkedin };
