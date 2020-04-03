const axios = require("axios");
const pino = require("pino");
const {
  config: {
    auth: { clientId, host, secretKey },
  },
} = require("../../config");

const authorize = async () => {
  return axios
    .post(`${host}/oauth/token`, {
      client_id: clientId,
      client_secret: secretKey,
      audience: `${host}/api/v2/`,
      grant_type: "client_credentials",
    })
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};

const createUser = async (params) => {
  if (!params.connection || !params.email || !params.password) {
    return false;
  }
  return axios
    .post(`${host}/api/v2/users`, params)
    .then(({ data }) => data)
    .catch((error) => {
      pino.error("ERROR", error);
      throw error;
    });
};

module.exports = {
  authorize,
  createUser,
};
