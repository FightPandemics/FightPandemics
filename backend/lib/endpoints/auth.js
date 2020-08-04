const Auth0 = require("../components/Auth0");
const {
  changePasswordSchema,
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

  app.post("/oauth", { schema: oAuthSchema }, async (req, reply) => {
    try {
      const { code, state } = req.body;
      if (decodeURIComponent(state) !== authConfig.state) {
        throw app.httpErrors.unauthorized("Invalid state");
      }
      const token = await Auth0.authenticate("authorization_code", {
        code,
        redirect_uri: req.headers.referer,
      });
      reply.setAuthCookies(token);
      const auth0User = await Auth0.getUser(token);
      const { email, email_verified: emailVerified } = auth0User;
      const { payload } = app.jwt.decode(token);
      const userId = payload[authConfig.jwtMongoIdKey];
      const dbUser = await User.findById(userId).populate("organisations");
      let user = null;
      if (dbUser) {
        const { firstName, lastName, organisations } = dbUser;
        user = {
          email,
          firstName,
          id: userId,
          lastName,
          organisations,
        };
      }
      return { email, emailVerified, token, user };
    } catch (err) {
      req.log.error(err, "OAuth error");
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
        req.log.error(err, "Error creating user");
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

  app.post("/login", { schema: loginSchema }, async (req, reply) => {
    const { body } = req;
    const { email, password } = body;
    try {
      const token = await Auth0.authenticate("password", {
        password,
        scope: "openid",
        username: email,
      });
      reply.setAuthCookies(token);
      const auth0User = await Auth0.getUser(token);
      const { email_verified: emailVerified } = auth0User;
      const { payload } = app.jwt.decode(token);
      const userId = payload[authConfig.jwtMongoIdKey];
      if (!userId) {
        throw new Error("no mongo_id found in JWT");
      }
      const dbUser = await User.findById(userId).populate("organisations");
      let user = null;
      if (dbUser) {
        const { firstName, lastName, organisations } = dbUser;
        user = {
          email,
          firstName,
          id: userId,
          lastName,
          organisations,
        };
      }
      return { email, emailVerified, token, user };
    } catch (err) {
      if (err.statusCode === 403) {
        throw app.httpErrors.unauthorized("Wrong email or password.");
      }
      if (err.statusCode === 429) {
        req.log.error(
          err,
          "Maximum number of sign in attempts exceeded. (10 times)",
        );
        throw app.httpErrors.tooManyRequests(
          "Maximum number of sign in attempts exceeded.",
        );
      }
      req.log.error(err, "Error logging in");
      throw app.httpErrors.internalServerError();
    }
  });

  app.post(
    "/change-password",
    { preHandler: [app.getServerToken], schema: changePasswordSchema },
    async (req) => {
      const { body, token } = req;
      const { email } = body;

      try {
        const responseMessage = await Auth0.changePassword(token, email);
        req.log.info(
          `Change password email created successfully for email=${email}`,
        );
        return { email, responseMessage };
      } catch (err) {
        req.log.error(err, "Error creating change password email");
        throw app.httpErrors.internalServerError(
          `Error creating change password email=${email}`,
        );
      }
    },
  );
}

module.exports = routes;
