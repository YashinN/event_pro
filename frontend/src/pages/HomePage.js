import { useState } from "react";

import EventCard from "../components/EventCard";
import FilterComponent from "../components/FilterComponent";

import "./HomePage.css";

const HomePage = (props) => {
  const [entity, setEntity] = useState("All");
  const [month, setMonth] = useState(1);
  const [filterData, setFilterData] = useState([]);

  const getMonth = (date) => {
    if (!date) {
      return null;
    }
    const splitDate = date.split("-");
    return Number(splitDate[1]);
  };

  const filterDate = (currentMonth) => {
    const filterItems = props.events.filter(
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
    const data = filterDate(Number(month));
    setFilterData(data);
  };

  return (
    <section className="container-fluid section-wrapper">
      <div className="container events-wrapper">
        <h1 className="main-title">Events 2023</h1>
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
                <EventCard
                  event={event}
                  colour={index % 2 === 0 ? "color-2" : "color-3"}
                  key={index}
                  isUser={props.isUser}
                  setIsUser={props.setIsUser}
                  loading={props.loading}
                  setMyEvents={props.setMyEvents}
                />
              ))}

            {entity !== "All" &&
              filterData.map((event, index) => (
                <EventCard
                  event={event}
                  colour={index % 2 === 0 ? "color-2" : "color-3"}
                  key={index}
                  isUser={props.isUser}
                  setIsUser={props.setIsUser}
                  setMyEvents={props.setMyEvents}
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
    </section>
  );
};

export default HomePage;
