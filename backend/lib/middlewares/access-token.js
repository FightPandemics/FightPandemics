const Auth0 = require("../components/Auth0");
const { decodeToken } = require("../components/Jwt");

const msg = {
  ok: "Token assigned successfully!",
  expired: "Token expired, going to refresh..",
  notFound: "Token not found, going to fetch..",
};

module.exports = async (req, res, next) => {
  if (req.header.token) {
    const decodedToken = await decodeToken(req.header.token);
    if (decodedToken.exp * 1000 < Date.now()) {
      req.log.info({ message: msg.expired });
      req.header.token = await Auth0.oauth();
      req.log.info({ message: msg.ok });
    }
  } else {
    req.log.info({ message: msg.notFound });
    req.header.token = await Auth0.oauth();
    req.log.info({ message: msg.ok });
  }

  return next();
};
