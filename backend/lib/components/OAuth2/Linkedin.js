const { Social } = require("./Social");

// reference: https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/context
const authUrlBase = "https://www.linkedin.com/oauth/v2/authorization";
const tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";
const userDataUrl = "https://www.linkedin.com/oauth/v2/me";

class Linkedin extends Social {
  constructor(clientId, secretKey) {
    super("linkedin", clientId, secretKey, authUrlBase, tokenUrl, userDataUrl);
  }

  buildOauthUrl(redirectUrl) {
    // TODO: need FP's linkedin, my dev app has no verified scope
    const scope = ["r_liteprofile", "r_emailaddress", "w_member_social"].join(
      " ",
    );
    return super.buildOauthUrl(scope, redirectUrl);
  }

  async getUserLink(accessToken) {
    const scope = ["r_liteprofile", "r_emailaddress", "w_member_social"].join(
      " ",
    );
    const data = await super.getUserData(scope, accessToken);
    return data;
  }
}

module.exports = { Linkedin };
