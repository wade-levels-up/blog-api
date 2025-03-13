const bcrypt = require("bcryptjs");
const passport = require("passport");
const database = require("./databaseService");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await database.getUserByName(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await database.getUserById(+jwt_payload.id);
      if (!user) {
        return done(null, false);
      }
      // Switch out user's isAuthor from the database value to the token value to verify by token
      user.isAuthor = jwt_payload.isAuthor;
      // Switch out user's id from the database value to the token value to verify by token
      user.id = +jwt_payload.id;
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
