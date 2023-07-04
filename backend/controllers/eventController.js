// database models
const { json } = require("body-parser");
const Event = require("../models/eventModel");
const User = require("../models/userModels");

// function to store emmpty fields.
const getEmptyFields = (body) => {
  let emptyFields = [];
  // loops through object and checks if empty values are found.
  for (const key in body) {
    if (body[key].length === 0) {
      // pushes empty value key to list
      emptyFields.push(key);
    }
  }
  // returns empty fields.
  return emptyFields;
};

// function compares times if one is larger than the other.
const compareTimes = (time1, time2) => {
  if (time1 > time2) {
    return false;
  } else {
    return true;
  }
};

// function to create event in db
const createEvent = async (req, res) => {
  // gets fields from body.
  const { description, date, venue, startTime, endTime, image } = req.body;
  // stores all empty fields received in body.
  let emptyFields = getEmptyFields(req.body);

  // checks for empty fields and sends error along with the empty fields.
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields!", emptyFields });
  }

  // compares start and end time
  if (!compareTimes(startTime, endTime)) {
    // sends error message to client.
    return res.status(400).json({
      error: "Conflicting times ,adjust values",
      emptyFields: ["startTime", "endTime"],
    });
  }

  try {
    // create new event in db with properties.
    const newEvent = await Event.create({
      description,
      venue,
      date,
      startTime,
      endTime,
      image,
    });

    // sends new event to client.
    res.status(200).json(newEvent);
  } catch (error) {
    console.log(error);
  }
};

// gets all events from server
const getAllEvents = async (req, res) => {
  try {
    // finds all events
    const events = await Event.find({});
    // sends all events to server
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
  }
};

// deletes a event from server
const deleteEvent = async (req, res) => {
  // gets event id from client.
  const { id } = req.params;
  try {
    // finds event by id and deletes
    const event = await Event.findOneAndDelete({ _id: id });
    // gets all events from server after delete
    const getEvents = await Event.find({});
    // sends all events to client.
    res.status(200).json(getEvents);
  } catch (error) {
    console.log(error);
  }
};

// function finds and update event in db.
const editEvent = async (req, res) => {
  // event id
  const { id } = req.params;
  // event information
  const { description, date, venue, startTime, endTime, image } = req.body;

  // stores all empty fields received in body.
  let emptyFields = getEmptyFields(req.body);

  // checks for empty fields and sends error along with the empty fields.
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields!", emptyFields });
  }

  // compares start and end time
  if (!compareTimes(startTime, endTime)) {
    return res.status(400).json({
      error: "Conflicting times ,adjust values",
      emptyFields: ["startTime", "endTime"],
    });
  }

  try {
    // finds and updates event with data in body.
    const updateEvent = await Event.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    // finds all events.
    const getEvents = await Event.find({});
    // sends all events back to client.
    res.status(200).json(getEvents);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  deleteEvent,
  editEvent,
  getEmptyFields,
};
