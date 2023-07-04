const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

// middleware to protect routes and verify auth token
const userToken = async (req, res, next) => {
  // get auth parameter.
  const { authorization } = req.headers;

  //  if not auth found sends error.
  if (!authorization) {
    return res.status(403).json({ error: "no auth token" });
  }

  // gets token value.
  const token = authorization.split(" ")[1];

  try {
    // verifies token and get user id from token.
    const { _id } = jwt.verify(token, process.env.SECRET);

    const isUser = await User.findOne({ _id });

    if (isUser) {
      next();
    } else {
      res.status(403).json({ error: "Not Authorised User" });
    }
  } catch (error) {
    console.log("here");
    res.status(403).json({ error: "not authenticated." });
  }
};

module.exports = { userToken };
