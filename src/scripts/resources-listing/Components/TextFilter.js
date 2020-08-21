import React from "react";

import prettifyName from "../Utils/prettyName";

class TextFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: props.categories,
      searchText: "",
      searchFiltered: [],
    };

    this._inputChange = this._inputChange.bind(this);
  }

  _inputChange(e) {
    const input = e.target.value;
    let availableOptions = [];
    if (input.length > 2) {
      availableOptions = this.state.categories.filter((cat) => {
        const pos = cat.name.toLowerCase().indexOf(input.toLowerCase());

        if (pos === -1) {
          return false;
        }

        return true;
      });
    }

    this.setState({
      searchText: input,
      searchFiltered: availableOptions,
    });
  }

  _addFilter(el) {
    this.props.update(el);
    this.setState({
      searchText: "",
      searchFiltered: [],
    });
  }

  render() {
    const title = prettifyName(this.props.name);

    const textComplete = this.state.searchFiltered.map((el, i) => {
      return (
        <li key={i}>
          <button onClick={() => this._addFilter(el)} disabled={!el.enabled}>
            {el.name}
          </button>
        </li>
      );
    });

    const activeElements = this.state.categories
      .filter((el) => el.active === true)
      .map((el, i) => {
        return (
          <li key={i}>
            <button
              onClick={() => {
                this.props.update(el);
              }}
            >
              {el.name}
            </button>
          </li>
        );
      });

    return (
      <div className="filter">
        <h3>{title}</h3>
        <div className="text-filter__wrap">
          <input type="text" value={this.state.searchText} onChange={this._inputChange} placeholder="Type to search" />
          <ul className="text-filter__autocomplete">{textComplete}</ul>
        </div>
        <ul className="text-filter__selected">{activeElements}</ul>
      </div>
    );
  }
}

export default TextFilter;
