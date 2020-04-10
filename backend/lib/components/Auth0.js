const axios = require("axios");
const qs = require("querystring");
const { config } = require("../../config");

const errorHandler = (err) => {
  const { response } = err;
  const { error, message } = response.data;
  const statusCode = response.status || response.data.statusCode;
  // eslint-disable-next-line no-throw-literal
  throw { error, message, statusCode };
};

const buildOauthUrl = (provider) => {
  const qParams = qs.stringify({
    audience: `${config.auth.domain}/api/v2/`,
    client_id: config.auth.clientId,
    connection: provider.name,
    redirect_uri: `${config.auth.appUrl}/login/callback`,
    response_type: "code",
    scope: provider.scope,
    state: config.auth.state,
  });
  return `${config.auth.domain}/authorize?${qParams}`;
};

const authenticate = async (grantType, payload = {}) => {
  const body = {
    audience: `${config.auth.domain}/api/v2/`,
    client_id: config.auth.clientId,
    client_secret: config.auth.secretKey,
    grant_type: grantType,
    ...payload,
  };
  return axios
    .post(`${config.auth.domain}/oauth/token`, qs.stringify(body), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(({ data }) => data.access_token)
    .catch(errorHandler);
};

const createUser = async (token, payload) => {
  return axios
    .post(`${config.auth.domain}/api/v2/users`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data)
    .catch(errorHandler);
};

const getUser = async (authorization) => {
  return axios
    .get(`${config.auth.domain}/userinfo`, {
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
