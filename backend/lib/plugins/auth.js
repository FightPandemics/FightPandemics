const fp = require("fastify-plugin");
const fastifyJwt = require("fastify-jwt");
const fastifySecretProvider = require("fastify-authz-jwks");
const mongoose = require("mongoose");
const NodeCache = require("node-cache");

const {
  config: { auth },
} = require("../../config");
const Auth0 = require("../components/Auth0");

const ttlSeconds = 86400;
const cache = new NodeCache({
  checkperiod: ttlSeconds * 0.2,
  stdTTL: ttlSeconds,
  useClones: false,
});

const checkAuth = async (req) => {
  await req.jwtVerify();
  const { user } = req;
  req.userId = mongoose.Types.ObjectId(user[auth.jwtMongoIdKey]);
};

const authPlugin = async (app) => {
  app.register(fastifyJwt, {
    algorithms: ["RS256"],
    audience: `${auth.domain}/api/v2/`,
    decode: { complete: true },
    secret: fastifySecretProvider({
      cache: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${auth.domain}/.well-known/jwks.json`,
      rateLimit: true,
    }),
  });

  app.decorateRequest("userId", null);

  app.decorate("authenticate", async (req, reply) => {
    try {
      await checkAuth(req);
    } catch (err) {
      reply.send(err);
    }
  });

  app.decorate("authenticateOptional", async (req) => {
    try {
      await checkAuth(req);
    } catch (err) {
      req.userId = null;
    }
  });

  app.decorate("getServerToken", async (req, reply) => {
    const msg = {
      error: "Error trying to retrieve the token",
      expired: "Token expired, going to refresh..",
      ok: "Token assigned successfully!",
    };
    const key = "token";

    let token;
    try {
      token =
        cache.get(key) || (await Auth0.authenticate("client_credentials"));
      const decodedToken = await app.jwt.decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        req.log.info({ message: msg.expired });
        token = await Auth0.authenticate("client_credentials");
      }
    } catch (err) {
      reply.code(500).send({ message: msg.error });
    }

    cache.set(key, token);
    req[key] = token;
    req.log.info(msg.ok);
  });
};

module.exports = fp(authPlugin);
