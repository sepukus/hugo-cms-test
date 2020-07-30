import React from "react";
import Filter from "../Components/Filter";

const FilterBar = (props) => {
  const filterOrder = ["category", "focus", "role", "organisation_size"];

  const filters = filterOrder.map((filterName) => {
    return (
      <Filter
        key={filterName}
        name={filterName}
        categories={props.filters[filterName]}
      />
    );
  });

  return (
    <section>
      <h2>Filters</h2>
      <button>Clear filters</button>
      <hr></hr>

      {filters}
    </section>
  );
};

export default FilterBar;
