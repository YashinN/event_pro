const express = require("express");

// user event controller functions
const {
  saveEvent,
  getMyEvents,
  deleteMyEvent,
} = require("../controllers/userEventController");

// custom middleware
const { userToken } = require("../middleware/userAuth");

//  express router
const router = express.Router();

//  get all user events
router.get("/:userEmail", userToken, getMyEvents);
// save user event
router.post("/:userEmail", userToken, saveEvent);
// delete user event
router.delete("/:userEmail", userToken, deleteMyEvent);

module.exports = router;
