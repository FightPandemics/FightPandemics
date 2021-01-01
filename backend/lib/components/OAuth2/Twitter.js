const { Social } = require("./Social");

// reference: https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens

class Twitter extends Social {
  constructor(clientId, secretKey) {
    super("twitter", clientId, secretKey);
    this.socialType = "twitter";
    this.authUrlBase = "https://api.twitter.com/oauth/request_token";
    this.tokenUrl = "https://api.twitter.com/oauth/authorize";
    this.userDataUrl = "https://api.twitter.com/2/users";
    this.scopes = ["email", "url"].join(",");
  }

  // reference: https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/object-model/user
  async getUserLink(accessToken) {
    const data = await super.getUserData(accessToken);
    return data.url;
  }
}

module.exports = { Twitter };
