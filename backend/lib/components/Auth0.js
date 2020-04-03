const axios = require("axios");
const {
  config: { auth },
} = require("../../config");
const User = require("./User");

const oauth = async () => {
  return axios({
    method: "POST",
    url: `${auth.host}/oauth/token`,
    data: {
      client_id: auth.clientId,
      client_secret: auth.secretKey,
      audience: `${auth.host}/api/v2/`,
      grant_type: "client_credentials",
    },
  })
    .then(({ data }) => data.access_token)
    .catch((error) => {
      throw error;
    });
};

const createUser = async (token, payload) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios({
    method: "POST",
    url: `${auth.host}/api/v2/users`,
    headers,
    data: payload,
  })
    .then(({ data }) => User.created(data))
    .catch((error) => {
      const { status } = error.response;
      if (status === 409) {
        return User.alreadyExist();
      }
      throw error;
    });
};

module.exports = {
  oauth,
  createUser,
};
