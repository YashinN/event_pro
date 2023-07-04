const router = require("express").Router();
const passport = require("passport");
const { successAuth } = require("../controllers/authController");

// const CLIENT_URL = "http://localhost:3000/";

// success route for github and goodle successful auth
router.get("/login/success", successAuth);

// route handles failed github/google authentication.
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

// logs out google or github user
router.get("/logout", (req, res) => {
  // clears user logout credentials.
  req.logout();
  // redirect to home page
});

// route to authenticate goodle login.
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// google callback to navigate to google login client
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// route to authenticate github login.
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// google callback to navigate to github login client.
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
