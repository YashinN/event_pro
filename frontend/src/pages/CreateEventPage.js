import CreateEventForm from "../components/CreateEventForm";
import "./CreateEventPage.css";

const CreateEventPage = (props) => {
  return (
    <section className="container-fluid create-event-section section-wrapper">
      <div className="container create-event-wrapper mb-4">
        <h1 className="form-title">Create Event</h1>
        <CreateEventForm
          setEvents={props.setEvents}
          events={props.events}
          user={props.user}
        />
      </div>
    </section>
  );
};

export default CreateEventPage;
