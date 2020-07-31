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
