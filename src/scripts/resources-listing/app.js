import React from "react";
import ReactDOM from "react-dom";

import algoliasearch from "algoliasearch/lite";

import Header from "./Layout/Header";
import FilterBar from "./Layout/FilterBar";
import Listing from "./Layout/Listing";

import prettifyName from "./utils/prettyName";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialFilters: this._sortInitialFilters(props.filters),
      filters: {},
    };

    this._filterUpdate = this._filterUpdate.bind(this);

    const client = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_KEY
    );

    this.searchindex = client.initIndex(process.env.ALGOLIA_INDEX_NAME);
  }

  componentDidMount() {
    this.setState({
      filters: this.state.initialFilters,
    });
  }

  componentDidUpdate() {
    const query = this._buildQuery();
    console.log(query);

    this.searchindex
      .search("", {
        filters: query,
      })
      .then(({ hits }) => {
        console.log("hits", hits);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  _buildQuery() {
    const filters = this.state.filters;
    const active = {};

    /*
     * Get all our active filters to add to query
     */
    Object.keys(filters).forEach((filter) => {
      const names = [];

      filters[filter].forEach((el) => {
        // early return if category is all or not active
        if ((filter === "category" && el.name === "all") || el.active != true) {
          return;
        }

        names.push(el.name);
      });

      if (names.length > 0) {
        active[filter] = names;
      }
    });

    let filterStrings = [];
    Object.keys(active).forEach((filter) => {
      let strings = [];
      active[filter].forEach((el) => {
        strings.push(`${filter}:"${el}"`);
      });
      filterStrings.push(`(${strings.join(" OR ")})`);
    });

    const query = filterStrings.join(" AND ");

    return query;
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

  _sortInitialFilters(filters) {
    return {
      category: filters.category,
      focus: filters.focus,
      role: filters.role,
      organisation_size: filters.organisation_size,
    };
  }

  render() {
    return (
      <div>
        <Header />
        <FilterBar filters={this.state.filters} update={this._filterUpdate} />
        <Listing />
      </div>
    );
  }
}

const element = document.getElementById("resource-listing");
if (element) {
  const appData = JSON.parse(element.innerHTML);
  ReactDOM.render(<App filters={appData} />, element);
}
