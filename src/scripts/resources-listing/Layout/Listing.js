import React from "react";

const Listing = (props) => {
  const cards = props.results.map((result) => {
    return (
      <a href={result.permalink} key={result.permalink} className="card card--resource">
        <div className="card__image-wrapper">
          <img src={result.banner_image} alt="" />
        </div>
        <div className="card__content">
          <span className="card__category">{result.category}</span>
          <span className="card__date">{result.post_date}</span>
          <p className="card__title">{result.title}</p>
        </div>
        <p className="card__focus">
          <strong>Focus</strong> {result.focus}
        </p>
      </a>
    );
  });

  const loadingClass = props.loading ? " loading" : "";

  return (
    <section className={`resource-listing__listing${loadingClass}`}>
      <div className="uk-container">
        <div className="cards-wrapper">{cards}</div>
      </div>
      <div className="loader-wrapper">
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
