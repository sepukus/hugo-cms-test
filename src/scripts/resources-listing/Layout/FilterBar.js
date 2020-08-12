import React from "react";

import Filter from "../Components/Filter";

const FilterBar = (props) => {
  const filters = Object.keys(props.filters).map((filterName) => {
    return (
      <Filter
        key={filterName}
        name={filterName}
        update={props.update}
        categories={props.filters[filterName]}
      />
    );
  });

  let visibleClass = props.visible ? "" : " hidden";

  return (
    <section className={`resource-listing__filter-bar${visibleClass}`}>
      <div className="inner">
        <div className="filter-bar__header">
          <h2>Filters</h2>
          <button onClick={props.clear}>Clear filters</button>
        </div>

        {filters}
      </div>
    </section>
  );
};

export default FilterBar;
