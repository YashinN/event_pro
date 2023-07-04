import eventLogo from "../images/Event.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import MyEventCard from "./MyEventCard";
import MessageModal from "./MessageModal";
import { useState } from "react";

const Navbar = (props) => {
  // state to toggle modals
  const [showModal, setShowModal] = useState(false);

  // request to logut user. Logs out user that has logged in with github or goolgle.
  const logoutRequest = async () => {
    const response = await fetch(process.env.REACT_APP_LOGOUT);
  };

  // handles  logout
  const handleLogout = () => {
    // removes user from local storage
    localStorage.removeItem("user");
    // sets logged in state to false
    // props.setLoggedIn(false);
    logoutRequest();
  };

  // opens modal
  const openModal = () => {
    setShowModal(true);
  };
  // closes modal.
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-primary p-3"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={eventLogo} alt="" className="event-logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link active" href="/">
                  All Events
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>

              {props.user && (
                <li className="nav-item">
                  <a
                    className="btn btn-primary nav-link"
                    data-bs-toggle="offcanvas"
                    href="#offcanvasExample"
                    role="button"
                    aria-controls="offcanvasExample"
                  >
                    MY EVENTS
                  </a>
                </li>
              )}

              {!props.user
                ? null
                : props.user.isAdmin && (
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Manage Events
                      </Link>
                      <div className="dropdown-menu">
                        <Link to="createEvent" className="dropdown-item">
                          Create Event
                        </Link>
                        <Link to="editEvent" className="dropdown-item">
                          Edit Event
                        </Link>
                      </div>
                    </li>
                  )}
            </ul>
          </div>

          {props.user ? (
            <div className="login-credentials">
              <p className="text-light m-0 mx-3">{props.user.email}</p>
              <Link to="/">
                <button
                  className="btn btn-outline-light btn-sm"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button type="button" className="btn btn-outline-light btn-sm">
                  Login | Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title" id="offcanvasExampleLabel">
            My Events
          </h3>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="row gy-5">
            {props.myEvents.map((event, index) => (
              <MyEventCard
                event={event}
                colour={index % 2 === 0 ? "color-1" : "color-4"}
                key={index}
                user={props.user}
                setMyEvents={props.setMyEvents}
                openModal={openModal}
              />
            ))}
          </div>
        </div>
        <MessageModal
          showModal={showModal}
          closeModal={closeModal}
          message={"Event has been removed!"}
        />
      </div>
    </>
  );
};

export default Navbar;
