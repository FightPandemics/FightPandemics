const axios = require("axios");
const queryString = require("query-string");
const { generateUUID } = require("../../utils");
const {
  config: {
    oauth2: { github },
  },
} = require("../../../config");

// reference: https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#web-application-flow

const dialogUrlBase = "https://github.com/login/oauth/authorize";
const authUrl = "https://github.com/login/oauth/access_token";
const userDataUrl = "https://api.github.com/user";

const buildOauthUrl = (redirectUrl) => {
  const stringifiedParams = queryString.stringify({
    client_id: github.clientId,
    redirect_uri: redirectUrl,
    state: generateUUID({ range: 32 }),
  });
  return `${dialogUrlBase}?${stringifiedParams}`;
};

const authenticate = async (codeStr, stateStr, redirectUrl) => {
  const { data } = await axios({
    headers: { Accept: "application/json" },
    method: "post",
    params: {
      client_id: github.clientId,
      client_secret: github.secretKey,
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
    headers: {
      Authorization: `token ${accesstoken}`,
    },
    method: "get",
    url: userDataUrl,
  });
  return data.html_url;
};

module.exports = { authenticate, buildOauthUrl, getUserLink };
