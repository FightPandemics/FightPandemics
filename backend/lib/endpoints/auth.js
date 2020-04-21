const httpErrors = require("http-errors");

const Auth0 = require("../components/Auth0");
const { loginSchema, signupSchema } = require("./schema/auth");
const { config } = require("../../config");

/*
 * /api/auth
 */
async function routes(app) {
  app.get("/social", async (_, reply) => {
    const defaultScope = "openid profile email";
    return reply.send({
      facebook: Auth0.buildOauthUrl({ name: "facebook", scope: defaultScope }),
      google: Auth0.buildOauthUrl({
        name: "google-oauth2",
        scope: defaultScope,
      }),
      linkedin: Auth0.buildOauthUrl({ name: "linkedin", scope: defaultScope }),
    });
  });

  app.post("/oauth", async (req, reply) => {
    try {
      const { code, state } = req.body;
      if (decodeURIComponent(state) !== config.auth.state) {
        reply.code(401).send({ message: "Invalid state" });
      }
      const accessToken = await Auth0.authenticate("authorization_code", {
        code,
        redirect_uri: `${config.auth.appUrl}/login/callback`,
      });
      return reply.send({ token: accessToken });
    } catch (err) {
      return reply.code(err.statusCode).send(err);
    }
  });

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
