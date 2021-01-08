const axios = require("axios");
const qs = require("querystring");
const { generateUUID } = require("../../utils");

class Social {
  constructor(
    socialType,
    clientId,
    secretKey,
    authUrlBase,
    tokenUrl,
    userDataUrl,
    scopes,
    extraFields = {},
  ) {
    if (new.target === Social) {
      throw new TypeError("Social class is abstract, cannot construct.");
    }
    if (this.getUserLink === undefined) {
      throw new TypeError("must override method getUserLink");
    }
    if (!socialType || !authUrlBase || !tokenUrl || !userDataUrl || !scopes) {
      throw new TypeError("Must define all arguments");
    }

    this.socialType = socialType; // social type
    this.clientId = clientId; // client ID
    this.secretKey = secretKey; // secret Key
    this.authUrlBase = authUrlBase; // authentication dialog URL base
    this.tokenUrl = tokenUrl; // social endpoint to get accessToken
    this.userDataUrl = userDataUrl; // user endpoint to get userData
    this.scopes = scopes; // scopes for auth and accessing endpoints
    this.extraFields = extraFields; // special fields needed
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
        ...this.extraFields,
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
