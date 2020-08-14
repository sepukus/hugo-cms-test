import React from "react";

export default class Jumbotron extends React.Component {
  render() {
    const {banner_image, banner_title, banner_description, banner_right_image} = this.props;
    return <div>
      <div className="jumbotron C01-hero" style={{
        backgroundImage: banner_image && `url(${banner_image})`
      }}>
        <div className="mw7 center ph3">
          <div className="db mb3">
            <p>banner image:</p>
            { banner_image && <img src={ banner_image } /> }
            <div className="mw7 relative bg-fix-primary mb3">
              <h1 className="f2 f1-l b di lh-title mb3 white mw6 bg-primary">
                { banner_title }
              </h1>
            </div>
            <div className="mw7 relative bg-fix-primary">
              {banner_description && <p className="b f4 di lh-title mb3 white mw6 bg-primary">{ banner_description }</p>}
            </div>
            <p>banner image right:</p>
            { banner_right_image && <img src={ banner_right_image } alt={ banner_title } /> }
          </div>
        </div>
      </div>
    </div>;
  }
}
