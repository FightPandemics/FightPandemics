const axios = require("axios");
const qs = require("querystring");
const { config } = require("../../config");

const {
  auth: { domain: AUTH_DOMAIN },
} = config;

const getAuthHeaders = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const returnError = (err) => {
  const {
    response: { data, status },
  } = err;
  const { error, message } = data;
  const statusCode = status || data.statusCode;
  // eslint-disable-next-line no-throw-literal
  throw { error, message, statusCode };
};

const buildOauthUrl = (provider) => {
  const qParams = qs.stringify({
    audience: `${AUTH_DOMAIN}/api/v2/`,
    client_id: config.auth.clientId,
    connection: provider.name,
    redirect_uri: `${config.auth.appUrl}/login/callback`,
    response_type: "code",
    scope: provider.scope,
    state: config.auth.state,
  });
  return `${AUTH_DOMAIN}/authorize?${qParams}`;
};

const authenticate = async (grantType, payload = {}) => {
  const body = {
    audience: `${AUTH_DOMAIN}/api/v2/`,
    client_id: config.auth.clientId,
    client_secret: config.auth.secretKey,
    grant_type: grantType,
    ...payload,
  };
  try {
    const res = axios.post(`${AUTH_DOMAIN}/oauth/token`, body);
    console.log("oauth token response", { res });
    return data.access_token;
  } catch (err) {
    returnError(err);
  }
};

const createUser = async (token, payload) => {
  const res = await axios.post(
    `${AUTH_DOMAIN}/api/v2/users`,
    payload,
    getAuthHeaders(token),
  );
  console.log("createUser", res);
  return res.data;
};

const getUser = async (authorization) => {
  return axios
    .get(`${AUTH_DOMAIN}/userinfo`, {
      headers: { Authorization: authorization },
    })
    .then(({ data }) => data)
    .catch(errorHandler);
};

module.exports = {
  authenticate,
  buildOauthUrl,
  createUser,
  getUser,
};
