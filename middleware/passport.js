const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/keys");

//Strategies
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

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

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done(null, false);
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      return done(null, false);
    } catch (error) {
      return done(error);
    }
  }
);
