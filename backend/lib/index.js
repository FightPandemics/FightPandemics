const express = require("express");
const cors = require("cors");
const passport = require("passport");
const pino = require("pino")();
const pinoExpress = require("pino-express");

const passportMiddleware = require("./middlewares/passport");
const errorMiddleware = require("./middlewares/error");
const version = require("./endpoints/version");
const users = require("./endpoints/users");
const posts = require("./endpoints/posts");
const geo = require("./endpoints/geo");

function createApp() {
  const app = express();
  app.disable("etag").disable("x-powered-by");
  app.use(cors());
  app.use(pinoExpress(pino));
  app.use(express.json());

  // Passportn Middleware
  app.use(passport.initialize());
  passportMiddleware(passport);

  // Endpoints
  app.get("/version", version());
  app.use("/api/users", users);
  app.use("/api/posts", posts);
  app.use("/api/geo", geo);

  app.use(errorMiddleware);

  return app;
}

module.exports = createApp;
