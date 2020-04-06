const cors = require("cors");
const passport = require("./plugins/passport");
const version = require("./endpoints/version");
const auth = require("./endpoints/auth");
const geo = require("./endpoints/geo");
const posts = require("./endpoints/posts");
const user = require("./endpoints/user");

function createServer(app) {
  app.use(cors());
  app.register(passport);

  app.get("/api/version", version);
  app.register(auth, { prefix: "/api/auth" });
  app.register(user, { prefix: "/api/user" });
  app.register(geo, { prefix: "/api/geo" });
  app.register(posts, { prefix: "/api/posts" });

  return app;
}

module.exports = createServer;
