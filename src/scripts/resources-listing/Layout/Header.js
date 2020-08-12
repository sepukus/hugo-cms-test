import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  const toggleFilters = () => {
    props.filterToggle();
  };

  const toggleOrder = () => {
    console.log("order toggled");
  };

  return (
    <section className="resource-listing__header">
      <button onClick={toggleFilters}>Hide filters</button>
      <button onClick={toggleOrder}>Most Recent</button>
    </section>
  );
};

export default Header;
