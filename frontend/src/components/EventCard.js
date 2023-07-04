import { useState } from "react";
// modal component
import MessageModal from "./MessageModal";
// component css
import "./EventCard.css";

const EventCard = (props) => {
  // toggles state to show message modal
  const [showModal, setShowModal] = useState(false);
  // sets loading state when making api calls.
  const [loading, setLoading] = useState(null);

  // request to server to save and event to My events or user events.
  const saveRequest = async () => {
    // sets loading state while waiting for response.
    setLoading(true);
    // makes request with user email as identifier in req params
    // sends event id to derver in body.
    const response = await fetch(
      process.env.REACT_APP_MYEVENTS + props.isUser.email,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.isUser.token}`,
        },
        body: JSON.stringify({ id: props.event._id }),
      }
    );

    // recevies user saved event data from server
    const data = await response.json();

    // if successful response
    if (response.ok) {
      // toggles off loading state.
      setLoading(null);
      // stores recevied user events
      // props.setIsUser(data);
      props.setMyEvents(data.allUserEvents);

      openModal();
    }
    setLoading(null);
  };

  // onclick request to save user event.
  const handleSave = () => {
    saveRequest();
  };

  // opens message modal on successful save
  const openModal = () => {
    setShowModal(true);
  };

  // closes message modal on click.
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="col-12 col-md-6 col-lg-6 col-xl-4">
      <div className={`container event-card px-0 ${props.colour}`}>
        {props.isUser && (
          <button
            type="button"
            className="btn btn-outline-primary mark-btn btn"
            onClick={handleSave}
          >
            {loading ? (
              <div className="loading-container">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              "Save"
            )}
          </button>
        )}

        <img src={props.event.image} alt="" className="event-card-img" />

        <div className=" p-3 ">
          <h5 className="mb-2">{props.event.description}</h5>
          <h5 className="mb-2">Date:{props.event.date}</h5>
          <h5 className="mb-2">Venue:{props.event.venue}</h5>
          <h5 className="mb-2">
            Time:{props.event.startTime} - {props.event.endTime}
          </h5>
        </div>
      </div>
      <MessageModal
        showModal={showModal}
        closeModal={closeModal}
        message={"Event has been saved!"}
      />
    </div>
  );
};

export default EventCard;
