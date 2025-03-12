const passport = require("passport");
const jwt = require("jsonwebtoken");

function verifyLogin(req, res, next) {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login failed",
      });
    }

    req.logIn(user, { session: false }, (error) => {
      if (error) {
        return res.send(error);
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1hr" }
      );

      return res.json({ token });
    });
  })(req, res, next);
}

module.exports = { verifyLogin };
