const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModels");

// function to create jwt token
const createToken = (_id, isAdmin) => {
  // takes id and isAdmin and stores in payload.
  return jwt.sign({ _id, isAdmin }, process.env.SECRET, { expiresIn: "1d" });
};

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

// function to signup user and store user in db.
const signupUser = async (req, res) => {
  // gets user email an password from client.
  const { email, password } = req.body;

  // gets and stores any empty fields.
  let emptyFields = getEmptyFields(req.body);

  try {
    // checks if email or password is empty
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please fill in all fields", emptyFields });
    }

    // finds a user by email.
    const userExists = await User.findOne({ email });

    // checks if user exists in db.Sends error
    if (userExists) {
      return res
        .status(400)
        .json({ error: "Email already in use", emptyFields: ["email"] });
    }

    // creates salt with bcrypt middlewate.
    const salt = await bcrypt.genSalt(10);
    // hashes password
    const hashedPassword = await bcrypt.hash(password, salt);

    // creates new user in db with emai and hashed password.
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // gets user admin state
    const isAdmin = user.isAdmin;
    // gets user events
    const userEvents = user.userEvents;
    // creates new jwt with user id and admin state in payload.
    const token = createToken(user._id, user.isAdmin);
    //sends user information and token to client.
    res.status(200).json({ email, isAdmin, userEvents, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// function to login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let emptyFields = getEmptyFields(req.body);

  try {
    // checks for empty email or password
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please fill in all fields", emptyFields });
    }

    // finds user by email
    const user = await User.findOne({ email });

    // if user not found sends error.
    if (!user) {
      return res
        .status(400)
        .json({ error: "Incorrect Email", emptyFields: ["email"] });
    }

    // checks if password is matched. if not sends error.
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      emptyFields = ["password"];
      return res
        .status(400)
        .json({ error: "Incorrect Password", emptyFields: ["password"] });
    }

    // creates auth token
    const isAdmin = user.isAdmin;
    const userEvents = user.userEvents;
    const token = createToken(user._id, user.isAdmin);

    // send auth token and user email
    res.status(200).json({ email, isAdmin, userEvents, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = {
  signupUser,
  loginUser,
};
