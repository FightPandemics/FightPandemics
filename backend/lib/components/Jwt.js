const jwt = require("jsonwebtoken");
const atob = require("atob");
const { config } = require("../../config");

const createToken = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, config.jwt.key, config.jwt.params, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.key, config.jwt.params, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });

const decodeToken = (token) =>
  new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(atob(token.split(".")[1])));
    } catch (e) {
      reject(e);
    }
  });

module.exports = {
  createToken,
  verifyToken,
  decodeToken,
};
