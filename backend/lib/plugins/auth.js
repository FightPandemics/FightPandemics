const fp = require("fastify-plugin");
const fastifyJwt = require("fastify-jwt");
const fastifyCookie = require("fastify-cookie");
const fastifySecretProvider = require("fastify-authz-jwks");
const mongoose = require("mongoose");
const NodeCache = require("node-cache");

const TOKEN_COOKIE = "token";
// 2nd non-httpOnly "dummy" cookie so user can logout offline
const REMEMBER_COOKIE = "remember";

const {
  config: { appDomain, auth, env },
} = require("../../config");
const Auth0 = require("../components/Auth0");

const ttlSeconds = 86400;
const cache = new NodeCache({
  checkperiod: ttlSeconds * 0.2,
  stdTTL: ttlSeconds,
  useClones: false,
});

const authSetCookieOptions = (httpOnly = true) => {
  return {
    domain: appDomain,
    httpOnly,
    maxAge: auth.cookieMaxAgeSeconds,
    path: "/",
    sameSite: "strict",
    secure: env !== "dev" && httpOnly,
  };
};

const authClearCookieOptions = () => {
  return {
    domain: appDomain,
    expires: new Date(0),
    path: "/",
  };
};

const checkAuth = async (req, reply) => {
  // user has logged out - clear token cookie
  if (!(REMEMBER_COOKIE in req.cookies) && TOKEN_COOKIE in req.cookies) {
    delete req.cookies[TOKEN_COOKIE];
    reply.clearCookie(TOKEN_COOKIE, authClearCookieOptions());
  }

  await req.jwtVerify();
  const { user } = req;
  const userId = user[auth.jwtMongoIdKey];
  if (!userId) {
    throw new Error("User id not found in JWT");
  }
  req.userId = mongoose.Types.ObjectId(userId);
};

const authPlugin = async (app) => {
  app.register(fastifyCookie);

  app.register(fastifyJwt, {
    algorithms: ["RS256"],
    audience: `${auth.domain}/api/v2/`,
    cookie: {
      cookieName: TOKEN_COOKIE,
    },
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
      await checkAuth(req, reply);
    } catch (err) {
      reply.send(err);
    }
  });

  app.decorate("authenticateOptional", async (req, reply) => {
    try {
      await checkAuth(req, reply);
    } catch (err) {
      if (err.message === "User id not found in JWT") {
        reply.send(err);
        return;
      }
      req.userId = null;
    }
  });

  // eslint-disable-next-line func-names
  app.decorateReply("setAuthCookies", function (token) {
    this.setCookie(TOKEN_COOKIE, token, authSetCookieOptions());
    this.setCookie(REMEMBER_COOKIE, "-", authSetCookieOptions(false));
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
