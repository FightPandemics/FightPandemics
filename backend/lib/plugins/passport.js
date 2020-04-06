const fp = require("fastify-plugin");
const jwt = require("jsonwebtoken");
const fastifyJwt = require("fastify-jwt");
const fastifySecretProvider = require("fastify-authz-jwks");
const NodeCache = require("node-cache");

const {
  config: { auth },
} = require("../../config");
const Auth0 = require("../components/Auth0");

const ttlSeconds = 86400;
const cache = new NodeCache({
  stdTTL: ttlSeconds,
  checkperiod: ttlSeconds * 0.2,
  useClones: false,
});

const passportPlugin = async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: fastifySecretProvider({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${auth.domain}/.well-known/jwks.json`,
    }),
    audience: `${auth.domain}/api/v2/`,
    algorithms: ["RS256"],
    decode: { complete: true },
  });

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.decorate("getServerToken", async (req, res) => {
    const msg = {
      ok: "Token assigned successfully!",
      expired: "Token expired, going to refresh..",
      error: "Error trying to retrieve the token",
    };
    const key = "token";

    let token;
    try {
      token =
        cache.get(key) || (await Auth0.authenticate("client_credentials"));
      const decodedToken = await jwt.decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        req.log.info({ message: msg.expired });
        token = await Auth0.authenticate("client_credentials");
      }
    } catch (err) {
      res.code(500).json({ message: msg.error });
    }

    cache.set(key, token);
    req[key] = token;
    req.log.info(msg.ok);
  });
};

module.exports = fp(passportPlugin);
