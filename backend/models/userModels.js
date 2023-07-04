const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// schema to store user data.
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  userEvents: [],
});

module.exports = mongoose.model("User", userSchema);
