const express = require("express");

// event controller functions
const {
  createEvent,
  getAllEvents,
  deleteEvent,
  editEvent,
} = require("../controllers/eventController");

// custom middleware

const { adminToken } = require("../middleware/adminAuth");

// express router
const router = express.Router();

// create new event route
router.post("/", adminToken, createEvent);
// get all events route
router.get("/", getAllEvents);
// delete an event route
router.delete("/:id", adminToken, deleteEvent);
// edit an event route
router.patch("/:id", adminToken, editEvent);

module.exports = router;
