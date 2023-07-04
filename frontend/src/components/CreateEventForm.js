import { useState } from "react";
import { convertImage } from "../utils/utlis";
import MessageModal from "./MessageModal";
import "./CreateEventForm.css";

const CreateEventForm = (props) => {
  // Form inputs for new event
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState("");
  // Gets current date limits date input
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  // Sets loading state when making api calls
  const [loading, setLoading] = useState(null);
  // Stores image as base64 data
  const [postImage, setPostImage] = useState({ myFile: "" });
  // Shows message modal when event created.
  const [showModal, setShowModal] = useState(false);
  // state stores empty fields / empty inputs.
  const [emptyFields, setEmptyFields] = useState([]);
  // state handles error from db.
  const [error, setError] = useState(null);

  // function gets the current date
  function getCurrentDate() {
    // formats date
    return new Date().toISOString().slice(0, 10);
  }

  // resets all states to default
  const resetStates = () => {
    setDescription("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setVenue("");
    setError(null);
    setEmptyFields([]);
    setPostImage({ myFile: "" });
    setImage("");
  };

  // Makes request to api to create new event
  const creatEventRequest = async () => {
    // sets loading state
    setLoading(true);
    // Gets base64 image
    const image = postImage.myFile;

    try {
      // fetch request sends form input data to server.
      const response = await fetch(process.env.REACT_APP_EVENTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user.token}`,
        },
        body: JSON.stringify({
          description,
          date,
          venue,
          startTime,
          endTime,
          image,
        }),
      });

      const data = await response.json();

      // if res not ok sets error ,empty fields and loading state.
      if (!response.ok) {
        setLoading(null);
        setError(data.error);
        setEmptyFields(data.emptyFields);
      }

      // if res ok updates event records, resets states & displays success modal.
      if (response.ok) {
        setLoading(null);
        props.events.push(data);
        setError(null);
        resetStates();
        openModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Makes create event request to server on click.
  const handleCreate = () => {
    creatEventRequest();
  };

  // Resets states when clear button clicked.
  const handleClear = () => {
    resetStates();
  };

  // Function toggles state to open modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function toggles state to close modal
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
    <form action="">
      {error && <p className="text-danger mb-0">{error}</p>}

      <div className="form-group">
        <label for="description" className="form-label mt-4">
          Description
        </label>
        <input
          type="text"
          className={`form-control form-control-sm ${
            emptyFields.includes("description") ? "is-invalid" : ""
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
              emptyFields.includes("startTime") ? "is-invalid" : ""
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
          value={image}
          onChange={(e) => {
            handleImage(e);
          }}
          accept=".jpeg,.png,.jpeg"
        />
      </div>

      <div className="mt-4 create-wrapper">
        <button type="button" className="btn btn-primary" onClick={handleClear}>
          Clear
        </button>
        <button
          type="button"
          className="btn btn-success mx-4"
          onClick={handleCreate}
        >
          {loading ? (
            <div className="loading-container">
              <div className="spinner-border " role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span className="mx-2">Loading...</span>
            </div>
          ) : (
            "Create"
          )}
        </button>
      </div>
      <MessageModal
        showModal={showModal}
        closeModal={closeModal}
        message={"Event has been added!"}
      />
    </form>
  );
};

export default CreateEventForm;
