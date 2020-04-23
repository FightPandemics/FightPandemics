const httpErrors = require("http-errors");

const Auth0 = require("../components/Auth0");
const {
  loginSchema,
  oAuthSchema,
  oAuthProviderSchema,
  signupSchema,
} = require("./schema/auth");
const { config } = require("../../config");

/*
 * /api/auth
 */
async function routes(app) {
  app.post("/oauth", { schema: oAuthSchema }, async (req) => {
    try {
      const { code, state } = req.body;
      if (decodeURIComponent(state) !== config.auth.state) {
        return new httpErrors.Unauthorized("Invalid state");
      }
      const accessToken = await Auth0.authenticate("authorization_code", {
        code,
        redirect_uri: req.headers.referer,
      });
      return { token: accessToken };
    } catch (err) {
      req.log.error("OAuth error", err);
      return new httpErrors.InternalServerError();
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

  // todo: add "password confirmation" check
  app.post(
    "/signup",
    { preHandler: [app.getServerToken], schema: signupSchema },
    async (req) => {
      const { body, token } = req;
      const { email, password } = body;
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
          return new httpErrors.Conflict("User already exists");
        }
        req.log.error("Error creating user", { err });
        return new httpErrors.InternalServerError();
      }
      const accessToken = await Auth0.authenticate("password", {
        password: req.body.password,
        scope: "openid",
        username: req.body.email,
      });
      return { emailVerified: false, token: accessToken };
    },
  );

  app.post("/login", { schema: loginSchema }, async (req) => {
    const { email, password } = req.body;
    try {
      const token = await Auth0.authenticate("password", {
        password,
        scope: "openid",
        username: email,
      });
      const user = await Auth0.getUser(token);
      const { email_verified: emailVerified } = user;
      return { emailVerified, token };
    } catch (err) {
      if (err.statusCode === 403) {
        return new httpErrors.Unauthorized("Wrong email or password.");
      }
      req.log.error("Error logging in", { err });
      return new httpErrors.InternalServerError();
    }
  });
}

module.exports = routes;
