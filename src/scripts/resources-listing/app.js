import React from "react";
import ReactDOM from "react-dom";

import Header from "./Layout/Header";
import FilterBar from "./Layout/FilterBar";
import Listing from "./Layout/Listing";

const App = (props) => {
  return (
    <div>
      <Header />
      <FilterBar filters={props.filters} />
      <Listing />
    </div>
  );
};

const element = document.getElementById("resource-listing");
const appData = JSON.parse(element.innerHTML);
ReactDOM.render(<App filters={appData} />, element);
