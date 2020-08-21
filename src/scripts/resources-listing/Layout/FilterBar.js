import React from "react";

import Filter from "../Components/Filter";
import TextFilter from "../Components/TextFilter";

const FilterBar = (props) => {
  const filters = Object.keys(props.filters).map((filterName) => {
    if (filterName === "industry") {
      return <TextFilter key={filterName} name={filterName} update={props.update} categories={props.filters[filterName]} />;
    }

    return <Filter key={filterName} name={filterName} update={props.update} categories={props.filters[filterName]} />;
  });

  let visibleClass = props.visible ? "" : " hidden";

  if (props.visible) {
    document.body.classList.add("filters-open");
  } else {
    document.body.classList.remove("filters-open");
  }

  return (
    <section className={`resource-listing__filter-bar${visibleClass}`}>
      <div className="inner">
        <div className="filter-bar__header">
          <h2>Filters</h2>
          <button className="uk-visible@m clear-filters" onClick={props.clear}>
            Clear filters
          </button>
          <button className="hide-filters uk-hidden@m" onClick={props.filterToggle}>
            <img src="/img/icons/cross.svg" alt="Close filters" />
          </button>
        </div>

        <ul uk-accordion="multiple: true; active: 0">{filters}</ul>
      </div>
      <div className="uk-hidden@m filters-m-button-box">
        <button className="clear-filters" onClick={props.clear}>
          Clear filters
        </button>
        <button className="apply-filters" onClick={props.runQuery}>
          Apply
        </button>
      </div>
    </section>
  );
};

export default FilterBar;
