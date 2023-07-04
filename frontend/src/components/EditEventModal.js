import { useState } from "react";
import { convertImage } from "../utils/utlis";
import MessageModal from "./MessageModal";

const EditEventModal = (props) => {
  // Form inputs for new event sets values to prop data.
  const [description, setDescription] = useState(props.event.description);
  const [venue, setVenue] = useState(props.event.venue);
  const [date, setDate] = useState(props.event.date);
  const [startTime, setStartTime] = useState(props.event.startTime);
  const [endTime, setEndTime] = useState(props.event.endTime);

  // Gets current date limits date input
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  // Shows message modal when event created.
  const [showModal, setShowModal] = useState(false);
  // Sets loading state when making api calls
  const [loading, setLoading] = useState(null);

  // state stores empty fields.
  const [emptyFields, setEmptyFields] = useState([]);
  // state handles error from db.
  const [error, setError] = useState(null);
  const [image, setImage] = useState("img");
  // Stores image as base64 data
  const [postImage, setPostImage] = useState(props.event.image);

  // get current date and formats
  function getCurrentDate() {
    return new Date().toISOString().slice(0, 10);
  }

  // resets states to initial prop data.
  const resetStates = () => {
    setDescription(props.event.description);
    setDate(props.event.date);
    setStartTime(props.event.startTime);
    setEndTime(props.event.endTime);
    setVenue(props.event.venue);
    setError(null);
    setEmptyFields([]);
    setPostImage(props.event.image);
    setImage("img");
    setLoading(null);
  };

  // Patch request to server to edit event.
  const editEventRequest = async () => {
    // stores base64 converted image.
    const image = postImage.myFile;
    setLoading(true);

    try {
      // makes request using event id in params and sends state data in body.
      const response = await fetch(
        process.env.REACT_APP_EVENTS + "/" + props.event._id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.user.token}`,
          },
          body: JSON.stringify({
            description,
            date,
            venue,
            startTime,
            image,
            endTime,
          }),
        }
      );

      // gets new event data from server.
      const data = await response.json();

      // if res not ok sets error and empty fields.
      if (!response.ok) {
        setLoading(null);
        setError(data.error);
        setEmptyFields(data.emptyFields);
      }

      // if res ok updates state event recors , resets states to default, displays success message.
      if (response.ok) {
        setLoading(null);
        props.setEvents(data);
        setError(null);
        openModal();
        const eventsFilter = props.filterDate(Number(props.month), data);
        props.setFilterData(eventsFilter);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // edit button clicked makes request to edit a event.
  const handleEdit = () => {
    editEventRequest();
  };

  // closes message modal for successful edit.
  const handleClose = () => {
    props.closeModal();
    resetStates();
  };

  // opens edit modal
  const openModal = () => {
    setShowModal(true);
  };

  // closes edit modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function converts image to base64 to send and store in mongoDB
  const handleImage = async (e) => {
    // stores image name.
    setImage(e.target.value);
    // gets image data.
    const image = e.target.files[0];
    // checks if image exists
    if (e.target.files[0]) {
      // calls convertImage to create base64 image.
      const base64 = await convertImage(image);
      // sets and stores the converted image.
      setPostImage({ ...postImage, myFile: base64 });
    }
  };

  return (
    <div>
      {props.showModal && (
        <>
          <div
            className="modal fade show"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content p-3">
                <div className="modal-body">
                  <form action="">
                    <h1>Edit Event</h1>
                    {error && <p className="text-danger mb-0">{error}</p>}

                    <div className="form-group">
                      <label for="description" className="form-label mt-4">
                        Description
                      </label>
                      <input
                        type="text"
                        className={`form-control form-control-sm ${
                          emptyFields.includes("description")
                            ? "is-invalid"
                            : ""
                        }`}
                        id="description"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label for="startDate" className="form-label mt-4">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className={`form-control form-control-sm ${
                          emptyFields.includes("date") ? "is-invalid" : ""
                        }`}
                        min={currentDate}
                        id="startDate"
                        placeholder="Enter event date"
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                    </div>
                    <div className="time-container">
                      <div className="form-group">
                        <label for="start-time" className="form-label mt-4">
                          Start Time
                        </label>
                        <input
                          type="time"
                          className={`form-control form-control-sm ${
                            emptyFields.includes("startTime")
                              ? "is-invalid"
                              : ""
                          }`}
                          id="start-time"
                          value={startTime}
                          onChange={(e) => {
                            setStartTime(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label for="end-time" className="form-label mt-4">
                          End Time
                        </label>
                        <input
                          type="time"
                          className={`form-control form-control-sm ${
                            emptyFields.includes("endTime") ? "is-invalid" : ""
                          }`}
                          id="end-time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label for="exampleSelect1" className="form-label mt-4">
                        Choose Venue
                      </label>
                      <select
                        className={`form-control form-control-sm ${
                          emptyFields.includes("venue") ? "is-invalid" : ""
                        }`}
                        id="exampleSelect1"
                        value={venue}
                        onChange={(e) => {
                          setVenue(e.target.value);
                        }}
                      >
                        <option></option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        <option>E</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label for="formFile" className="form-label mt-4">
                        Select Image
                      </label>
                      <input
                        className={`form-control form-control-sm ${
                          emptyFields.includes("image") ? "is-invalid" : ""
                        }`}
                        type="file"
                        id="formFile"
                        onChange={(e) => {
                          handleImage(e);
                        }}
                        accept=".jpeg,.png,.jpeg"
                      />
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-success mx-4"
                        onClick={handleEdit}
                      >
                        {loading ? (
                          <div className="loading-container">
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                            <span className="mx-2">Loading...</span>
                          </div>
                        ) : (
                          "Update"
                        )}
                      </button>
                    </div>
                    <MessageModal
                      showModal={showModal}
                      closeModal={closeModal}
                      message={"Event has been updated!"}
                      closeForm={props.closeModal}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal-backdrop fade show"
            onClick={props.closeModal}
          ></div>
        </>
      )}
    </div>
  );
};

export default EditEventModal;
