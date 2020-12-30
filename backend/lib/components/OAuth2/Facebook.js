const { Social } = require("./Social");

// reference: https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/
const authUrlBase = "https://www.facebook.com/v9.0/dialog/oauth";
const tokenUrl = "https://graph.facebook.com/v9.0/oauth/access_token";
const userDataUrl = "https://graph.facebook.com/me";

class Facebook extends Social {
  constructor(clientId, secretKey) {
    super("facebook", clientId, secretKey, authUrlBase, tokenUrl, userDataUrl);
  }

  buildOauthUrl(redirectUrl) {
    const scope = ["email", "user_friends", "user_link"].join(",");
    return super.buildOauthUrl(scope, redirectUrl);
  }

  async getUserLink(accessToken) {
    // TODO: add 'user_link' after enabling in Facebook API dashboard
    const scope = ["id", "email", "first_name", "last_name"].join(",");
    const data = await super.getUserData(scope, accessToken);
    return data; // data.user_link;
  }
}

module.exports = { Facebook };
