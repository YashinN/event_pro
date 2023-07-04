const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./middleware/passport");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;

//Routes
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userEventRoutes = require("./routes/userEventRoutes");
const authRoutes = require("./routes/auth");

//Express App
const app = express();

// connect to mongoDb.
connectDB();

// increase request limit to 50mb
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
// uses cookie session
app.use(
  cookieSession({
    name: "session",
    keys: ["key"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// App uses passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "https://wakeful-week-production.up.railway.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// google & github authentication routes
app.use("/auth", authRoutes);
// User routes sign Up , Log In
app.use("/user", userRoutes);
// event admin routes
app.use("/events", eventRoutes);
// user save event routes
app.use("/myEvents", userEventRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
