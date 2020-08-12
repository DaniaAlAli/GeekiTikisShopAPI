const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

//Models
const { User } = require("../db/models");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username: username } });

    const passwordMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    passwordMatch ? done(null, user) : done(null, false);
  } catch (error) {
    done(error);
  }
});
