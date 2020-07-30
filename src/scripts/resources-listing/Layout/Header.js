import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  const toggleFilters = () => {
    console.log("filter toggled");
  };

  const toggleOrder = () => {
    console.log("order toggled");
  };

  return (
    <section>
      <button onClick={toggleFilters}>Hide filters</button>
      <button onClick={toggleOrder}>Most Recent</button>
    </section>
  );
};

export default Header;
