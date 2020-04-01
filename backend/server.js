const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/users");
const posts = require("./routes/posts");
const geo = require("./routes/geo");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(`MongoDB Connection Error: ${err}`));

// Passportn Middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use these routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/geo", geo);

// Error Handling Middleware
app.use((req, res, next) => {
  const error = new Error(`Page not found for ${req.url}`);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

//  Serve static asset assets if in production
if (process.env.NODE_ENV === "production") {
  // Set Static Folder
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Web App is live on port ${port}`));
