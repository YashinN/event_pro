import { useState } from "react";
import EditEventModal from "./EditEventModal";
import "./EditEventCard.css";

const EditEventCard = (props) => {
  // State to open/close message modal
  const [showModal, setShowModal] = useState(false);
  // State to store loading state while making api calls.
  const [loading, setLoading] = useState(null);

  // function toggles state to open message modal
  const openModal = () => {
    setShowModal(true);
  };

  // function toggles state to close message modal.
  const closeModal = () => {
    setShowModal(false);
  };

  // Makes api call to delete a event.
  const deleteEventRequest = async () => {
    // sets loading state.
    setLoading(true);

    try {
      // makes delete request to server using event id in query.
      const response = await fetch(
        process.env.REACT_APP_EVENTS + "/" + props.event._id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      );

      // gets event data from server.
      const data = await response.json();

      // If respoonse from server successful .
      if (response.ok) {
        setLoading(null);
        props.openModal();
        // sets events to new data,
        props.setEvents(data);
        // calls prop to filter events by date.
        const eventsFilter = props.filterDate(Number(props.month), data);
        // stores the filtered events by month.
        props.setFilterData(eventsFilter);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // makes request when delete button is clicked.
  const handleDelete = () => {
    deleteEventRequest();
  };

  return (
    <div className="col-12 col-md-6 col-lg-6 col-xl-4 test">
      <div className={`container event-card px-0 ${props.colour}`}>
        <img src={props.event.image} alt="" className="event-card-img" />

        <div className=" py-3 px-2">
          <h5 className="mb-2">{props.event.description}</h5>
          <h5 className="mb-2">Date:{props.event.date}</h5>
          <h5 className="mb-2">Venue:{props.event.venue}</h5>
          <h5 className="mb-0">
            Time:{props.event.startTime} - {props.event.endTime}
          </h5>
        </div>

        <div className="btn-controls">
          <button
            type="button"
            className="btn btn-danger delete-btn "
            onClick={handleDelete}
          >
            {loading ? (
              <div className="loading-container">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span className="mx-2">Loading...</span>
              </div>
            ) : (
              "Delete"
            )}
          </button>
          <button
            type="button"
            className="btn btn-primary edit-btn "
            onClick={openModal}
          >
            Edit
          </button>
        </div>
      </div>
      <EditEventModal
        showModal={showModal}
        closeModal={closeModal}
        event={props.event}
        setEvents={props.setEvents}
        setFilterData={props.setFilterData}
        filterDate={props.filterDate}
        month={props.month}
        user={props.user}
      />
    </div>
  );
};

export default EditEventCard;
