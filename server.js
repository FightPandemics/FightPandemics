const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./backend/routes/users");

const app = express();

// DB Config
const db = require("./backend/config/keys").mongoURI;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => newFunction()("MongoDB Connected Successfully"))
  .catch(err => console.log(err));

// Passportn Middleware
app.use(passport.initialize());

// Passport config
require("./backend/config/passport")(passport);

// Use these routes
app.use("/api/users", users);

//  Serve static asset assets if in production
if (process.env.NODE_ENV === "production") {
  // Set Static Folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Web App is live on port ${port}`));
function newFunction() {
  return console.log;
}
