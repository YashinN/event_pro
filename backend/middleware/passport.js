const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const User = require("../models/userModels");

const findUser = async (email, cb) => {
  // finds user in db
  const user = await User.findOne({ email });
  // if user exists
  if (user) {
    // calls done callback
    return cb;
  } else {
    // creates user in db
    const newUser = await User.create({ email, password: "0" });
    // calls done callback
    return cb;
  }
};

// passport middleware handles google authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://eventpro-production.up.railway.app/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, done) {
      // gets google email addresss
      const email = profile.emails[0].value;
      //checks db if user exists and create user if user does not exist
      findUser(email, done(null, profile));
    }
  )
);

// passport middleware handles github authentication
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        "https://eventpro-production.up.railway.app/auth/github/callback",
      scope: ["user:email"],
    },
    function (accessToken, refreshToken, profile, done) {
      // gets google email addresss
      const email = profile.emails[0].value;

      //checks db if user exists and create user if user does not exist
      findUser(email, done(null, profile));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
