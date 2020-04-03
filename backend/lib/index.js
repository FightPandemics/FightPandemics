const express = require("express");
const cors = require("cors");
const passport = require("passport");
const pino = require("pino")();
const pinoExpress = require("pino-express");
const bodyParser = require("body-parser");

const passportMiddleware = require("./middlewares/passport");
const errorMiddleware = require("./middlewares/error");
const version = require("./endpoints/version");
const users = require("./endpoints/users");
const posts = require("./endpoints/posts");
const geo = require("./endpoints/geo");
const signUp = require("./endpoints/signup");

function createApp() {
  const app = express();
  app.disable("etag").disable("x-powered-by");
  app.use(cors());
  app.use(pinoExpress(pino));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/version", version);
  app.post("/api/signup", signUp);

  // Private Endpoints
  app.use(passport.initialize());
  passportMiddleware(passport);

  app.use("/api/users", users);
  app.use("/api/posts", posts);
  app.use("/api/geo", geo);

  app.use(errorMiddleware);

  return app;
}

module.exports = createApp;
