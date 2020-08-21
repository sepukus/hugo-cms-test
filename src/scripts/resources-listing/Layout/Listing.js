import React from "react";

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    /* Get page scroll and pass to component did update to stop it scrolling
    to the bottom when new elements added */
    if (prevProps.page < this.props.page) {
      return window.pageYOffset;
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      window.scrollTo(window.pageXOffset, snapshot);
    }
  }

  render() {
    const pagedItems = this.props.page * this.props.perPage;

    const cards = this.props.results
      .filter((result, index) => index < pagedItems)
      .map((result) => {
        return (
          <a href={result.permalink} key={result.permalink} className="card card--resource">
            <div className="card__image-wrapper">
              <img src={result.banner_image} alt="" />
            </div>
            <div className="card__content">
              <span className={`card__category ${result.category_tag}`}>{result.category}</span>
              <span className="card__date">{result.post_date}</span>
              <p className="card__title">{result.title}</p>
            </div>
            <p className="card__focus">
              <strong>Focus</strong> {result.focus}
            </p>
          </a>
        );
      });

    const loadingClass = this.props.loading ? " loading" : "";

    const showButton = pagedItems < this.props.results.length;

    return (
      <section className={`resource-listing__listing${loadingClass}`}>
        <div className="uk-container">
          <div className="uk-text-center uk-margin-medium-top uk-margin-medium-bottom">
            Displaying &lt;{this.props.results.length}&gt; resource{this.props.results.length != 1 ? "s" : ""}
          </div>
          <div className="cards-wrapper" ref={this.listRef}>
            {cards}
          </div>
          {showButton ? (
            <div className="uk-text-center uk-margin-large-top uk-margin-large-bottom">
              <button onClick={this.props.pageUpdate} className="resource-listing__show-more">
                Show More
              </button>
            </div>
          ) : (
            ""
          )}
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
  }
}

export default Listing;
