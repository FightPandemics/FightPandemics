const { Social } = require("./Social");

// reference: https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens
const authUrlBase = "https://api.twitter.com/oauth/request_token";
const tokenUrl = "https://api.twitter.com/oauth/authorize";
const userDataUrl = "https://api.twitter.com/2/users";
const scopes = ["email", "url"].join(",");

class Twitter extends Social {
  constructor(clientId, secretKey) {
    super(
      "twitter",
      clientId,
      secretKey,
      authUrlBase,
      tokenUrl,
      userDataUrl,
      scopes,
    );
  }

  // reference: https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/object-model/user
  async getUserLink(accessToken) {
    const data = await super.getUserData(accessToken);
    return data.url;
  }
}

module.exports = { Twitter };
