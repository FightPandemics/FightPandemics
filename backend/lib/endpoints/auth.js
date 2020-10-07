const Auth0 = require("../components/Auth0");
const { isValidEmail, isValidPassword } = require("../utils");
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
        throw app.httpErrors.unauthorized("invalidState");
      }
      const token = await Auth0.authenticate("authorization_code", {
        code,
        redirect_uri: req.headers.referer,
      });
      reply.setAuthCookies(token);
      const auth0User = await Auth0.getUser(token);
      const {
        email,
        email_verified: emailVerified,
        given_name: firstName,
        family_name: lastName,
      } = auth0User;
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
      return {
        email,
        emailVerified,
        firstName,
        lastName,
        token,
        user,
      };
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
      if (!email) {
        throw app.httpErrors.badRequest("emailRequired");
      } else if (!isValidEmail(email)) {
        throw app.httpErrors.badRequest("invalidEmail");
      }
      if (!password) {
        throw app.httpErrors.badRequest("passwordRequired");
      } else if (!isValidPassword(password)) {
        throw app.httpErrors.badRequest("invalidPassword");
      } else if (password !== confirmPassword) {
        throw app.httpErrors.badRequest("passwordNotMatch");
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
          throw app.httpErrors.conflict("userExists");
        } else if (
          err.message === "PasswordStrengthError: Password is too weak"
        ) {
          throw app.httpErrors.badRequest("passwordWeak");
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
        throw app.httpErrors.unauthorized("wrongCredentials");
      }
      if (err.statusCode === 429) {
        req.log.error(
          err,
          "Maximum number of sign in attempts exceeded. (10 times)",
        );
        throw app.httpErrors.tooManyRequests("maxSignInAttemptsExceeded");
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
        throw app.httpErrors.internalServerError("failedChangePasswordEmail");
      }
    },
  );
}

module.exports = routes;
