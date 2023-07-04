const FilterComponent = (props) => {
  // data passed to filter buttons
  const filters = [
    { id: "January", label: "Jan", month: 1 },
    { id: "February", label: "Feb", month: 2 },
    { id: "March", label: "Mar", month: 3 },
    { id: "April", label: "April", month: 4 },
    { id: "May", label: "May", month: 5 },
    { id: "June", label: "June", month: 6 },
    { id: "July", label: "July", month: 7 },
    { id: "August", label: "Aug", month: 8 },
    { id: "September", label: "Sep", month: 9 },
    { id: "October", label: "Oct", month: 10 },
    { id: "November", label: "Nov", month: 11 },
    { id: "December", label: "Dec", month: 12 },
  ];

  // function sets current filters according to number of months left in the year.
  const currentFilters = () => {
    // creates new date
    const date = new Date();
    // gets current month
    const month = date.getMonth();
    // filters the filter items and returns array of items according to months left in the year.
    const items = filters.filter((ele, index) => {
      return index >= month;
    });

    // adds the all filter option to the begining of the array.
    items.unshift({ id: "All", label: "All", month: 0 });
    return items;
  };

  return (
    <div
      className="btn-group container-fluid mb-3"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <div className="row filter-row">
        {currentFilters().map((filter, index) => (
          <div
            key={index}
            className="col-auto col-sm-auto col-md-auto px-0 filter-container"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id={filter.id}
              autoComplete="off"
              defaultChecked={props.entity === filter.id}
              data-month={filter.month}
              onClick={props.entityHandler}
            />
            <label
              className="btn btn-outline-primary btn filter-label"
              htmlFor={filter.id}
            >
              {filter.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
