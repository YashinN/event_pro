import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// comonents.
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";

function App() {
  // checks if local storage for user.
  const setUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // checks if user exists.
    if (user) {
      // gets user
      return user;
    }
    // return no user
    return null;
  };

  // state to define user.
  const [isUser, setIsUser] = useState(setUser());
  // state to handle logged in or not
  const [loggedIn, setLoggedIn] = useState(null);
  // stores all events.
  const [events, setEvents] = useState([]);
  // stores users saved events.
  const [myEvents, setMyEvents] = useState([]);
  // loading state for api calls.
  const [loading, setLoading] = useState(true);

  // request to get all events from server.
  const getEvents = async () => {
    setLoading(true);
    try {
      // req to fetch data
      const response = await fetch(process.env.REACT_APP_EVENTS);
      // stores events as json
      const data = await response.json();

      // if response ok sets component data
      if (response.ok) {
        setLoading(null);
        setEvents(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // request to get user saved events from server.
  const getMyEvents = async () => {
    try {
      // request to server with user id as identifier.
      const response = await fetch(
        process.env.REACT_APP_MYEVENTS + isUser.email,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isUser.token}`,
          },
        }
      );
      // stores user saved events as json
      const data = await response.json();
      if (response.ok) {
        // sets component data for user events.
        setMyEvents(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // req to verify google and github login
  const getGoogleUser = async () => {
    // fetch req to server/
    const response = await fetch(process.env.REACT_APP_SUCCESS, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });

    // stores user details.
    const data = await response.json();
    if (response.ok) {
      // gets user email address
      const user = data.user["emails"];
      const email = user[0].value;
      const isAdmin = data.isAdmin;
      const token = data.token;
      // stores user data in local storage.
      localStorage.setItem(
        "user",
        JSON.stringify({ email: email, isAdmin, token })
      );
      // sets users
      setIsUser(setUser());
    }
  };

  // use effect run everytime a user logs in/out or sign up
  useEffect(() => {
    // gets user from local storage.
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // if user exists sets isUser state.
      setIsUser(user);
    } else {
      setIsUser(null);
    }
  }, [loggedIn]);

  // use effect checks if google or github has been signed in
  // gets all events
  useEffect(() => {
    if (!isUser) {
      getGoogleUser();
    }

    getEvents();
  }, []);

  // useEffect gets user saved events when user logs in or when events state changes.
  useEffect(() => {
    if (isUser) {
      getMyEvents();
    }
  }, [isUser, events]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          user={isUser}
          setLoggedIn={setLoggedIn}
          events={events}
          myEvents={myEvents}
          setMyEvents={setMyEvents}
        />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  events={events}
                  isUser={isUser}
                  setIsUser={setIsUser}
                  loading={loading}
                  setMyEvents={setMyEvents}
                />
              }
            />
            <Route
              path="/createEvent"
              element={
                !isUser ? (
                  <Navigate to="/" />
                ) : isUser.isAdmin ? (
                  <CreateEventPage
                    setEvents={setEvents}
                    events={events}
                    user={isUser}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/editEvent"
              element={
                !isUser ? (
                  <Navigate to="/" />
                ) : isUser.isAdmin ? (
                  <EditEventPage
                    events={events}
                    setEvents={setEvents}
                    loading={loading}
                    user={isUser}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/login"
              element={
                isUser ? (
                  <Navigate to="/" />
                ) : (
                  <LoginPage setLoggedIn={setLoggedIn} />
                )
              }
            />
            <Route path="*" element={<HomePage events={events} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
