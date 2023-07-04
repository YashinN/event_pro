const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

// function to create jwt token
const createToken = (_id, isAdmin) => {
  // takes id and isAdmin and stores in payload.
  return jwt.sign({ _id, isAdmin }, process.env.SECRET, { expiresIn: "1d" });
};

const successAuth = async (req, res) => {
  // checks if user is signing in with google or github
  if (req.user === undefined) {
    return res.status(400).json({ message: "not O auth" });
  }

  try {
    if (req.user) {
      const email = req.user.emails[0].value;
      const user = await User.findOne({ email });
      //create new jwt auth token
      const token = createToken(user._id, user.isAdmin);
      //sends user information and token to client.
      //   res.status(200).json({ email, isAdmin, userEvents, token });
      // sends user info to client
      return res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        isAdmin: user.isAdmin,
        token,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { successAuth };
