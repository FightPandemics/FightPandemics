const express = require("express");
const cors = require("cors");
const passport = require("passport");
const pino = require("pino")();
const pinoExpress = require("pino-express");
var bodyParser = require("body-parser");

const passportMiddleware = require("./middlewares/passport");
const errorMiddleware = require("./middlewares/error");
const version = require("./endpoints/version");
const users = require("./endpoints/users");
const likes = require("./endpoints/likes");
const posts = require("./endpoints/posts");
const geo = require("./endpoints/geo");

function createApp() {
  const app = express();
  app.disable("etag").disable("x-powered-by");
  app.use(cors());
  app.use(pinoExpress(pino));
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  // Passportn Middleware
  app.use(passport.initialize());
  passportMiddleware(passport);

  // Endpoints
  app.get("/version", version());
  app.use("/api/users", users);
  app.use("/api/posts", posts);
  app.use("/api/likes", likes);
  app.use("/api/geo", geo);

  app.use(errorMiddleware);

  return app;
}

module.exports = createApp;
