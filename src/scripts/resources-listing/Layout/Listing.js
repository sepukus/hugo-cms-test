import React from "react";

const Listing = (props) => {
  const cards = props.results.map((result) => {
    return (
      <a
        href={result.permalink}
        key={result.permalink}
        className="card card--resource"
      >
        <img
          src="https://images.unsplash.com/photo-1585825431520-fdd13758b2c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80"
          alt=""
        />
        <span>{result.category}</span>
        {result.title}
        Focus {result.focus}
      </a>
    );
  });
  return <section>{cards}</section>;
};

export default Listing;
