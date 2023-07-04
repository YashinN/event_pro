const express = require("express");

// controller functions
const { signupUser, loginUser } = require("../controllers/userController");

// express router
const router = express.Router();

// sign up route
router.post("/signup", signupUser);
// login route
router.post("/login", loginUser);

module.exports = router;
