const Auth0 = require("../components/Auth0");
const { config } = require("../../config");

/*
 * /api/auth
 */
async function routes(app) {
  app.get("/social", async (_, reply) => {
    const defaultScope = "openid profile email";
    return reply.send({
      google: Auth0.buildOauthUrl({
        name: "google-oauth2",
        scope: defaultScope,
      }),
      facebook: Auth0.buildOauthUrl({ name: "facebook", scope: defaultScope }),
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

  app.post(
    "/authenticate",
    { preValidation: [app.getServerToken] },
    async (req, reply) => {
      const { token } = req;
      const payload = {
        connection: "Username-Password-Authentication",
        email: req.body.email,
        password: req.body.password,
        email_verified: false,
        verify_email: false,
      };

      try {
        await Auth0.createUser(token, payload);
      } catch (err) {
        if (err.statusCode !== 409) {
          return reply.code(err.statusCode).send(err);
        }
      }

      const accessToken = await Auth0.authenticate("password", {
        username: req.body.email,
        password: req.body.password,
        scope: "openid",
      });
      return reply.send({ token: accessToken });
    },
  );
}

module.exports = routes;
