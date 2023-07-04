const jwt = require("jsonwebtoken");

// middleware to protect routes and verify auth token
const adminToken = async (req, res, next) => {
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
    const { isAdmin } = jwt.verify(token, process.env.SECRET);

    if (!isAdmin) {
      res.status(403).json({ error: "Not Authorised Admin" });
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({ error: "not authenticated." });
  }
};

module.exports = { adminToken };
