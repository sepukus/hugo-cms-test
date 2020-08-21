import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  const [orderMenuOpen, setOrderMenuOpen] = useState(false);

  const toggleClass = orderMenuOpen ? "order-toggle open" : "order-toggle";

  const setOrder = (showDescending) => {
    props.changeOrder(showDescending);
    setOrderMenuOpen(false);
  };

  return (
    <section className="resource-listing__header">
      <button className="hide-filters" onClick={props.filterToggle}>
        {props.filtersVisible ? "Hide" : "Show"} filters
      </button>
      <div className={toggleClass}>
        <button onClick={() => setOrderMenuOpen(!orderMenuOpen)}>
          {props.displayDesc ? "Most Recent" : "Least Recent"}
          <img src="/img/icons/up-chevron.svg" alt="" />
        </button>
        <div>
          <button onClick={() => setOrder(true)}>Most Recent</button>
          <button onClick={() => setOrder(false)}>Least Recent</button>
        </div>
      </div>
    </section>
  );
};

export default Header;
