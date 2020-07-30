import React from "react";
import ReactDOM from "react-dom";

import Header from "./Layout/Header";
import FilterBar from "./Layout/FilterBar";
import Listing from "./Layout/Listing";

const App = (props) => {
  console.log(props);

  return (
    <div>
      <Header />
      <FilterBar />
      <Listing />
    </div>
  );
};

const element = document.getElementById("resource-listing");
const appData = JSON.parse(element.getAttribute("data-filters"));
ReactDOM.render(<App filters={appData} />, element);
