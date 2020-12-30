const { Social } = require("./Social");

// reference: https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens
const authUrlBase = "https://api.twitter.com/oauth/request_token";
const tokenUrl = "https://api.twitter.com/oauth/authorize";
const userDataUrl = "https://api.twitter.com/2/users";

class Twitter extends Social {
  constructor(clientId, secretKey) {
    super("twitter", clientId, secretKey, authUrlBase, tokenUrl, userDataUrl);
  }

  buildOauthUrl(redirectUrl) {
    const scope = "";
    return super.buildOauthUrl(scope, redirectUrl);
  }

  async getUserLink(accessToken) {
    const scope = ["email", "url"].join(",");
    const data = await super.getUserData(scope, accessToken);
    return data; // data.user_link;
  }
}

module.exports = { Twitter };
