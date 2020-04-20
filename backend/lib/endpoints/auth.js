const httpErrors = require("http-errors");
const Auth0 = require("../components/Auth0");
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

  app.post("signup", { preValidation: [app.getServerToken] }, async (req) => {
    const { body, token } = req;
    const { email, password } = body;
    const payload = {
      connection: "Username-Password-Authentication",
      email,
      email_verified: false,
      password,
      verify_email: false,
    };
    try {
      const res = await Auth0.createUser(token, payload);
      req.log.info(`User created successfully email= `);
      console.log("createUser OK", { res });
    } catch (err) {
      // 409 means CONFLICT, e.g. user exists
      if (err.statusCode === 409) {
        return new httpErrors.Conflict();
      }
      req.log.error("Error creating user", { err });
      return new httpErrors.InternalServerError();
    }
    const accessToken = await Auth0.authenticate("password", {
      password: req.body.password,
      scope: "openid",
      username: req.body.email,
    });
    return { token: accessToken };
  });

  app.post("login", async (req) => {
    const token = await Auth0.authenticate("password", {
      password: req.body.password,
      scope: "openid",
      username: req.body.email,
    });
    return { token };
  });
}

module.exports = routes;
