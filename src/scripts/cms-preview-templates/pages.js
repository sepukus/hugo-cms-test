import React from "react";
import format from "date-fns/format";

// eslint-disable-next-line no-unused-vars
import Jumbotron from "./components/jumbotron";

export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;

    const banner_image = entry.getIn(["data", "banner_image"]);
    const banner_right_image = entry.getIn(["data", "banner_right_image"]);

    return <div>
      <Jumbotron banner_image={banner_image} banner_right_image={banner_right_image} banner_title={entry.getIn(["data", "banner_title"])} banner_description={entry.getIn(["data", "banner_description"])}/>

      <div className="bg-grey-1 pv4">
        <div className="flex-l mhn1-l ph3 center mw7">
          <h2 className="f2 b lh-title mb2 w-40-l">{entry.getIn(["data", "blurb", "heading"])}</h2>
          <p className="w-60-l mb0">{entry.getIn(["data", "blurb", "text"])}</p>
        </div>
      </div>

      <div className="bg-off-white pv4">
        <div className="ph3 mw7 center">
          <h2 className="f2 b lh-title mb2">{entry.getIn(["data", "intro", "heading"])}</h2>
          <p className="mb4 mw6">{entry.getIn(["data", "intro", "text"])}</p>

          <div className="flex-ns mhn2-ns mb3">
            {(entry.getIn(["data", "products"]) || []).map((product, i) => <div className="ph2-ns w-50-ns" key={i}>
              <img src={getAsset(product.get("image"))} alt="" className="center db mb3" style={{width: "240px"}}/>
              <p>{product.get("text")}</p>
            </div>)}
          </div>
        </div>
      </div>
    </div>;
  }
}
