const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const pino = require("pino");
const User = require("../models/User");
const { config } = require("../../config");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt.key;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => pino.error(err));
    }),
  );
};
