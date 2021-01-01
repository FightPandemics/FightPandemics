const { Social } = require("./Social");

// reference: https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/

class Facebook extends Social {
  constructor(clientId, secretKey) {
    super(clientId, secretKey);
    this.socialType = "facebook";
    this.authUrlBase = "https://www.facebook.com/v9.0/dialog/oauth";
    this.tokenUrl = "https://graph.facebook.com/v9.0/oauth/access_token";
    this.userDataUrl = "https://graph.facebook.com/me";
    // TODO: add 'user_link' after enabling in Facebook API dashboard
    this.scopes = ["email" /* "user_link" */].join(","); // future scope: "user_friends"
  }

  // reference: https://developers.facebook.com/docs/permissions/reference/user_link
  async getUserLink(accessToken) {
    const data = await super.getUserData(accessToken);
    return data.user_link;
  }
}

module.exports = { Facebook };
