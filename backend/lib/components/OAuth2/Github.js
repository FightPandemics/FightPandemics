const axios = require("axios");
const { Social } = require("./Social");

// reference: https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#web-application-flow
const authUrlBase = "https://github.com/login/oauth/authorize";
const tokenUrl = "https://github.com/login/oauth/access_token";
const userDataUrl = "https://api.github.com/user";

class Github extends Social {
  constructor(clientId, secretKey) {
    super("github", clientId, secretKey, authUrlBase, tokenUrl);
  }

  buildOauthUrl(redirectUrl) {
    const scope = "";
    return super.buildOauthUrl(scope, redirectUrl);
  }

  static async getUserLink(accessToken) {
    const scope = "";
    const { data } = await axios.get(userDataUrl, {
      fields: scope,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data.html_url;
  }
}

module.exports = { Github };
