const axios = require("axios");
const qs = require("querystring");
const { config } = require("../../config");

const {
  auth: { domain: AUTH_DOMAIN },
} = config;

const errorHandler = (err) => {
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

  return axios
    .post(`${AUTH_DOMAIN}/oauth/token`, body)
    .then(({ data }) => data.access_token)
    .catch(errorHandler);
};

const createUser = async (token, payload) => {
  return axios
    .post(`${AUTH_DOMAIN}/api/v2/users`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data)
    .catch(errorHandler);
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
