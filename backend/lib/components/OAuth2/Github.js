const { Social } = require("./Social");

// reference: https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#web-application-flow

class Github extends Social {
  constructor(clientId, secretKey) {
    super(clientId, secretKey);
    this.socialType = "github";
    this.authUrlBase = "https://github.com/login/oauth/authorize";
    this.tokenUrl = "https://github.com/login/oauth/access_token";
    this.userDataUrl = "https://api.github.com/user";
    this.scopes = "";
  }

  // reference: https://docs.github.com/en/free-pro-team@latest/rest/reference/users#get-the-authenticated-user
  async getUserLink(accessToken) {
    const data = await super.getUserData(accessToken);
    return data.html_url;
  }
}

module.exports = { Github };
