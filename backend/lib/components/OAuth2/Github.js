const { Social } = require("./Social");

// reference: https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#web-application-flow
const authUrlBase = "https://github.com/login/oauth/authorize";
const tokenUrl = "https://github.com/login/oauth/access_token";
const userDataUrl = "https://api.github.com/user";
const scopes = "user";

class Github extends Social {
  constructor(clientId, secretKey) {
    super(
      "github",
      clientId,
      secretKey,
      authUrlBase,
      tokenUrl,
      userDataUrl,
      scopes,
    );
  }

  // reference: https://docs.github.com/en/free-pro-team@latest/rest/reference/users#get-the-authenticated-user
  async getUserLink(accessToken) {
    const data = await super.getUserData(accessToken);
    return data.html_url;
  }
}

module.exports = { Github };
