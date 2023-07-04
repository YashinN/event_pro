const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defines mongoDB schema to store event data.
const eventSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Events", eventSchema);
