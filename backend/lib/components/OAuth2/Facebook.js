const axios = require("axios");
const qs = require("querystring");
const { generateUUID } = require("../../utils");
const {
  config: {
    oauth2: { facebook },
  },
} = require("../../../config");

// reference: https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/

const dialogUrlBase = "https://www.facebook.com/v9.0/dialog/oauth";
const authUrl = "https://graph.facebook.com/v9.0/oauth/access_token";
const userDataUrl = "https://graph.facebook.com/me";
// TODO: add 'user_link' after enabling in Facebook API dashboard
const scopeData = ["id", "email", "first_name", "last_name"].join(",");

const buildOauthUrl = (redirectUrl) => {
  const stringifiedParams = qs.stringify({
    client_id: facebook.clientId,
    redirect_uri: redirectUrl,
    response_type: "code",
    scope: ["email", "user_friends", "user_link"].join(","),
    state: generateUUID({ range: 32 }),
  });
  return `${dialogUrlBase}?${stringifiedParams}`;
};

const authenticate = async (codeStr, stateStr, redirectUrl) => {
  const { data } = await axios({
    method: "get",
    params: {
      client_id: facebook.clientId,
      client_secret: facebook.secretKey,
      code: codeStr,
      redirect_uri: redirectUrl,
      state: stateStr,
    },
    url: authUrl,
  });
  return data.access_token;
};

const getUserLink = async (accesstoken) => {
  const { data } = await axios({
    method: "get",
    params: {
      access_token: accesstoken,
      fields: scopeData,
    },
    url: userDataUrl,
  });
  return data.user_link;
};

module.exports = { authenticate, buildOauthUrl, getUserLink };
