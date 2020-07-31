import React from "react";

import Filter from "../Components/Filter";

export default class FilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialFilters: this.sortInitialFilters(props.filters),
      filters: {},
    };

    this._filterUpdate = this._filterUpdate.bind(this);
  }

  sortInitialFilters(filters) {
    return {
      category: filters.category,
      focus: filters.focus,
      role: filters.role,
      organisation_size: filters.organisation_size,
    };
  }

  componentDidMount() {
    this.setState({
      filters: this.state.initialFilters,
    });
  }

  _handleCategoryChange(value) {
    let newFilters = this.state.filters;
    const allKey = "all";

    const filterIndex = this.state.filters[value.parent].findIndex(
      (el) => el.name === value.name
    );

    if (value.name == allKey) {
      newFilters[value.parent] = newFilters[value.parent].map((el, i) => {
        el.active = el.name == allKey ? true : false;
        return el;
      });
    } else {
      const allIndex = newFilters[value.parent].findIndex(
        (el) => el.name == allKey
      );
      newFilters[value.parent][allIndex].active = false;
      newFilters[value.parent][filterIndex].active = !newFilters[value.parent][
        filterIndex
      ].active;
    }

    this.setState({
      filters: newFilters,
    });
  }

  _filterUpdate(value) {
    /* Handle categories differently */
    if (value.parent == "category") {
      this._handleCategoryChange(value);
      return;
    }

    const newFilters = this.state.filters;

    const filterIndex = this.state.filters[value.parent].findIndex(
      (el) => el.name === value.name
    );

    newFilters[value.parent][filterIndex].active = !newFilters[value.parent][
      filterIndex
    ].active;

    this.setState({
      filters: newFilters,
    });
  }

  render() {
    const filters = Object.keys(this.state.filters).map((filterName) => {
      return (
        <Filter
          key={filterName}
          name={filterName}
          update={this._filterUpdate}
          categories={this.state.filters[filterName]}
        />
      );
    });

    return (
      <section>
        <h2>Filters</h2>
        <button>Clear filters</button>
        <hr></hr>

        {filters}
      </section>
    );
  }
}
