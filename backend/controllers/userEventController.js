// database models
const Event = require("../models/eventModel");
const User = require("../models/userModels");

// gets all users saved events.
const getMyEvents = async (req, res) => {
  // gets email
  const { userEmail } = req.params;

  try {
    // finds user by email.
    const user = await User.findOne({ email: userEmail });
    // gets ids of users saved events.
    const ids = user.userEvents;
    // finds events matching array of ids.
    const allUserEvents = await Event.find({ _id: { $in: ids } });
    // sends all user saved events.
    res.status(200).json(allUserEvents);
  } catch (error) {
    console.log(error);
  }
};

// stores user saved event in db by id.
const saveEvent = async (req, res) => {
  const { userEmail } = req.params;
  // event id to save.
  const { id } = req.body;

  try {
    // finds user by email
    const user = await User.findOne({ email: userEmail });

    // checks if event already exists in users saved events.
    if (user.userEvents.includes(id)) {
      return res.status(400).json({ message: "event exists" });
    }

    // finds user events to update.
    // updates events by adding event id to array.
    const updateUser = await User.findOneAndUpdate(
      { email: userEmail },
      { $push: { userEvents: id } }
    );

    const userUpdated = await User.findOne({ email: userEmail });
    // gets new list of saved event ids.
    const ids = userUpdated.userEvents;
    //finds all events that match an array of ids.
    const allUserEvents = await Event.find({ _id: { $in: ids } });
    // stores admin state
    const isAdmin = user.isAdmin;
    // stores email
    const email = user.email;
    // gets array of user saved ids.
    const userEvents = user.userEvents;

    // sends updated list of user events
    res.status(200).json({ allUserEvents });
  } catch (error) {
    console.log(error);
  }
};

// deletes user saved event
const deleteMyEvent = async (req, res) => {
  const { userEmail } = req.params;
  const { id } = req.body;

  // find user by email
  const user = await User.findOne({ email: userEmail });
  // returns array of id that do not match one to delete.
  const ids = user.userEvents.filter((item) => {
    return item !== id;
  });

  // updates user inforamtion in db with new array of ids.
  const updateUser = await User.findOneAndUpdate(
    { email: userEmail },
    { userEvents: ids }
  );

  // gets list of events matchin array of ids.
  const allUserEvents = await Event.find({ _id: { $in: ids } });
  // sends event to client.
  res.status(200).json(allUserEvents);
};

module.exports = { saveEvent, getMyEvents, deleteMyEvent };
