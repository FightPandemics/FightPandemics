const Auth0 = require("../components/Auth0");
const {
  loginSchema,
  oAuthSchema,
  oAuthProviderSchema,
  signupSchema,
} = require("./schema/auth");
const {
  config: { auth: authConfig },
} = require("../../config");

/*
 * /api/auth
 */
async function routes(app) {
  const User = app.mongo.model("IndividualUser");

  app.post("/oauth", { schema: oAuthSchema }, async (req) => {
    try {
      const { code, state } = req.body;
      if (decodeURIComponent(state) !== authConfig.state) {
        throw app.httpErrors.unauthorized("Invalid state");
      }
      const token = await Auth0.authenticate("authorization_code", {
        code,
        redirect_uri: req.headers.referer,
      });
      const auth0User = await Auth0.getUser(token);
      const { email, email_verified: emailVerified } = auth0User;
      const { payload } = app.jwt.decode(token);
      const userId = payload[authConfig.jwtMongoIdKey];
      const dbUser = await User.findById(userId);
      let user = null;
      if (dbUser) {
        const { firstName, lastName } = dbUser;
        user = {
          email,
          firstName,
          id: userId,
          lastName,
        };
      }
      return { email, emailVerified, token, user };
    } catch (err) {
      req.log.error("OAuth error", err);
      throw app.httpErrors.internalServerError();
    }
  });

  app.get(
    "/oauth/:provider",
    { schema: oAuthProviderSchema },
    async (req, reply) => {
      const { headers, params } = req;
      const { provider } = params;
      const providerName = provider === "google" ? "google-oauth2" : provider;
      const url = Auth0.buildOauthUrl(providerName, headers.referer);
      reply.redirect(url);
    },
  );

  app.post(
    "/signup",
    { preHandler: [app.getServerToken], schema: signupSchema },
    async (req) => {
      const { body, token } = req;
      const { email, password, confirmPassword } = body;
      if (password !== confirmPassword) {
        throw app.httpErrors.badRequest(
          "Password should be entered twice exactly the same",
        );
      }
      const payload = {
        connection: "Username-Password-Authentication",
        email,
        password,
        verify_email: true,
      };
      try {
        await Auth0.createUser(token, payload);
        req.log.info(`User created successfully email=${email}`);
      } catch (err) {
        if (err.statusCode === 409) {
          throw app.httpErrors.conflict("User already exists");
        } else if (
          err.message === "PasswordStrengthError: Password is too weak"
        ) {
          throw app.httpErrors.badRequest("Password is too weak");
        }
        req.log.error("Error creating user", { err });
        throw app.httpErrors.internalServerError();
      }
      const accessToken = await Auth0.authenticate("password", {
        password,
        scope: "openid",
        username: email,
      });
      return { emailVerified: false, token: accessToken };
    },
  );

  app.post("/login", { schema: loginSchema }, async (req) => {
    const { body } = req;
    const { email, password } = body;
    try {
      const token = await Auth0.authenticate("password", {
        password,
        scope: "openid",
        username: email,
      });
      const auth0User = await Auth0.getUser(token);
      const { email_verified: emailVerified } = auth0User;
      const { payload } = app.jwt.decode(token);
      const userId = payload[authConfig.jwtMongoIdKey];
      if (!userId) {
        throw new Error("no mongo_id found in JWT");
      }
      const dbUser = await User.findById(userId);
      let user = null;
      if (dbUser) {
        const { firstName, lastName } = dbUser;
        user = {
          email,
          firstName,
          id: userId,
          lastName,
        };
      }
      return { email, emailVerified, token, user };
    } catch (err) {
      if (err.statusCode === 403) {
        throw app.httpErrors.unauthorized("Wrong email or password.");
      }
      req.log.error(err, "Error logging in");
      throw app.httpErrors.internalServerError();
    }
  });
}

module.exports = routes;
