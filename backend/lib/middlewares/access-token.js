const Auth0 = require("../components/Auth0");
const { decodeToken } = require("../components/Jwt");

const msg = {
  ok: "Token assigned successfully!",
  expired: "Token expired, going to refresh..",
  notFound: "Token not found, going to fetch..",
  unauthorized: "Unauthorized",
  internalError: "Something went wrong.",
};

module.exports = async (req, res, next) => {
  try {
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
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return res.status(403).json({ message: msg.unauthorized });
    }
    return res.status(500).json({ message: msg.internalError });
  }
};
