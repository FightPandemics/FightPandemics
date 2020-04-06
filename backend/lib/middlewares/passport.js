// const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
// const pino = require("pino");
// const User = require("../models/schemas/User");
// const { config } = require("../../config");
//
// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = config.jwt.key;
//
// module.exports = (passport) => {
//   passport.use(
//     new JwtStrategy(opts, async (jwtPayload, done) => {
//       try {
//         const user = await User.findById(jwtPayload.id);
//         return done(null, user || false);
//       } catch (err) {
//         pino.error(err);
//         return done(err);
//       }
//     }),
//   );
// };
