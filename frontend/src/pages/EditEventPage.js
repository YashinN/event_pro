import { useState } from "react";

import EditEventCard from "../components/EditEventCard";
import FilterComponent from "../components/FilterComponent";
import MessageModal from "../components/MessageModal";

import "./HomePage.css";

const EditEventPage = (props) => {
  const [entity, setEntity] = useState("All");
  const [month, setMonth] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getMonth = (date) => {
    if (!date) {
      return null;
    }
    const splitDate = date.split("-");
    return Number(splitDate[1]);
  };

  const filterDate = (currentMonth, events) => {
    const filterItems = events.filter(
      (event) => getMonth(event.date) === currentMonth
    );
    return filterItems;
  };

  // sets entity or type of media when radio fields are selected.
  const entityHandler = (e) => {
    // sets entity type eg. movie, ebook ect to be searched.
    setEntity(e.target.id);
    const { month } = e.target.dataset;
    setMonth(month);
    const data = filterDate(Number(month), props.events);
    setFilterData(data);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="container-fluid section-wrapper">
      <div className="container events-wrapper">
        <h1 className="main-title">Manage Events</h1>
        <FilterComponent entity={entity} entityHandler={entityHandler} />
        <h2 className="mb-5 sec-title">{entity} Events</h2>

        {props.loading ? (
          <div className="loading-container">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span>Loading...</span>
          </div>
        ) : (
          <div className="row gy-5">
            {entity === "All" &&
              props.events.map((event, index) => (
                <EditEventCard
                  event={event}
                  setEvents={props.setEvents}
                  openModal={openModal}
                  colour={index % 2 === 0 ? "color-2" : "color-3"}
                  key={index}
                  filterDate={filterDate}
                  month={month}
                  setFilterData={setFilterData}
                  user={props.user}
                />
              ))}
            {entity !== "All" &&
              filterData.map((event, index) => (
                <EditEventCard
                  event={event}
                  setEvents={props.setEvents}
                  filterDate={filterDate}
                  month={month}
                  setFilterData={setFilterData}
                  openModal={openModal}
                  colour={index % 2 === 0 ? "color-2" : "color-3"}
                  key={index}
                  user={props.user}
                />
              ))}
            {props.events.length === 0 && entity === "All" && (
              <h2 className="text-info">No Events ....</h2>
            )}
            {filterData.length === 0 && entity !== "All" && (
              <h2 className="text-info">No Events in {entity} ....</h2>
            )}
          </div>
        )}
      </div>
      <MessageModal
        showModal={showModal}
        closeModal={closeModal}
        message={"Event has been removed!"}
      />
    </section>
  );
};

export default EditEventPage;
