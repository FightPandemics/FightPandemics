const axios = require("axios");
const qs = require("querystring");
const { generateUUID } = require("../../utils");

class Social {
  constructor(clientId, secretKey) {
    if (new.target === Social) {
      throw new TypeError("Social class is abstract, cannot construct.");
    }
    if (this.getUserLink === undefined) {
      throw new TypeError("must override method getUserLink");
    }

    this.clientId = clientId; // client ID
    this.secretKey = secretKey; // secret Key
  }

  buildOauthUrl(redirectUrl) {
    const stringifiedParams = qs.stringify({
      client_id: this.clientId,
      redirect_uri: redirectUrl,
      response_type: "code",
      scope: this.scopes,
      state: generateUUID({ range: 32 }),
    });
    return `${this.authUrlBase}?${stringifiedParams}`;
  }

  async authenticate(codeStr, stateStr, redirectUrl) {
    const { data } = await axios({
      headers: { Accept: "application/json" },
      method: "post",
      params: {
        client_id: this.clientId,
        client_secret: this.secretKey,
        code: codeStr,
        redirect_uri: redirectUrl,
        state: stateStr,
      },
      url: this.tokenUrl,
    });
    return data.access_token;
  }

  async getUserData(accessToken) {
    const { data } = await axios.get(this.userDataUrl, {
      fields: this.scopes,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  }
}

module.exports = { Social };
