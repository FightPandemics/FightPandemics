const { Social } = require("./Social");

// reference: https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/
const authUrlBase = "https://www.facebook.com/v9.0/dialog/oauth";
const tokenUrl = "https://graph.facebook.com/v9.0/oauth/access_token";
const userDataUrl = "https://graph.facebook.com/me";
// TODO: add 'user_link' after enabling in Facebook API dashboard
const scopes = ["email" /* "user_link" */].join(","); // future scope: "user_friends"

class Facebook extends Social {
  constructor(clientId, secretKey) {
    super(
      "facebook",
      clientId,
      secretKey,
      authUrlBase,
      tokenUrl,
      userDataUrl,
      scopes,
    );
  }

  // reference: https://developers.facebook.com/docs/permissions/reference/user_link
  async getUserLink(accessToken) {
    const data = await super.getUserData(accessToken);
    return data.user_link;
  }
}

module.exports = { Facebook };
