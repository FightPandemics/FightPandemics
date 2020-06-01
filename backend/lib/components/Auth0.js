const axios = require("axios");
const httpErrors = require("http-errors");
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

// todo: check improving the error handling here, could also check & handle or pass the response message e.g.
/*
    data: {
      error: 'invalid_grant',
      error_description: 'Wrong email or password.'
    }
 */
const wrapError = (err) => {
  const {
    response: { data, status },
  } = err;
  const { message } = data;
  const statusCode = status || data.statusCode;
  throw httpErrors(statusCode, message);
};

const buildOauthUrl = (connection, redirectTo) => {
  const qParams = qs.stringify({
    audience: `${AUTH_DOMAIN}/api/v2/`,
    client_id: config.auth.clientId,
    connection,
    redirect_uri: redirectTo,
    response_type: "code",
    scope: "openid email",
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
    const res = await axios.post(`${AUTH_DOMAIN}/oauth/token`, body);
    return res.data.access_token;
  } catch (err) {
    return wrapError(err);
  }
};

const createUser = async (token, payload) => {
  try {
    const res = await axios.post(
      `${AUTH_DOMAIN}/api/v2/users`,
      payload,
      getAuthHeaders(token),
    );
    return res.data;
  } catch (err) {
    return wrapError(err);
  }
};

const getUser = async (token) => {
  try {
    const res = await axios.get(
      `${AUTH_DOMAIN}/userinfo`,
      getAuthHeaders(token),
    );
    return res.data;
  } catch (err) {
    return wrapError(err);
  }
};

module.exports = {
  authenticate,
  buildOauthUrl,
  createUser,
  getUser,
};
