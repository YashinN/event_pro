import { useState } from "react";

const MyEventCard = (props) => {
  // sets loading state for api call.
  const [loading, setLoading] = useState(null);

  // request to remove user event
  const delMyEventRequest = async () => {
    setLoading(true);
    //  removes event from user events , sends email as identifier and event id.
    try {
      const response = await fetch(
        process.env.REACT_APP_MYEVENTS + props.user.email,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.user.token}`,
          },
          body: JSON.stringify({ id: props.event._id }),
        }
      );

      // recevies update list of user events.
      const data = await response.json();

      // if response ok updates user event states with new data.
      if (response.ok) {
        setLoading(null);
        // updates user events state
        props.setMyEvents(data);
        // opens success message model.
        props.openModal();
      }
      setLoading(null);
    } catch (error) {
      console.log(error);
    }
  };

  // makes delete request on click.
  const handleDel = () => {
    delMyEventRequest();
  };

  return (
    <div className="col-12">
      <div className={`container event-card px-0 ${props.colour}`}>
        <button
          type="button"
          className="btn btn-outline-primary mark-btn btn"
          onClick={handleDel}
        >
          {loading ? (
            <div className="loading-container">
              <div className="spinner-border " role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            "Remove"
          )}
        </button>

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
    </div>
  );
};

export default MyEventCard;
