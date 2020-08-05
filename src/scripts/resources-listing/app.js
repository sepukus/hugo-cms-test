import React from "react";
import ReactDOM from "react-dom";

import algoliasearch from "algoliasearch/lite";

import Header from "./Layout/Header";
import FilterBar from "./Layout/FilterBar";
import Listing from "./Layout/Listing";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialFilters: this._sortInitialFilters(props.filters),
      filters: {},
      searchResults: [],
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
    console.log("state", this.state);
  }

  /*
   * Get query and send to algolia
   */
  _querySearch() {
    const query = this._buildQuery();

    this.searchindex
      .search("", {
        filters: query,
        hitsPerPage: 1000,
      })
      .then(({ hits }) => {
        this._filterAvailable(hits);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  _filterAvailable(searchResults) {
    this.setState((currentState) => {
      const filterable = ["focus", "role", "organisation_size"];

      // Reset count to 0
      let filters = currentState.filters;
      filterable.forEach((filterName) => {
        filters[filterName].forEach((el) => {
          el.count = 0;
        });
      });

      // Loop over search results and increase count on filters found
      searchResults.forEach((result) => {
        filterable.forEach((filterName) => {
          const resultValue = result[filterName];
          const filterIndex = filters[filterName].findIndex(
            (el) => el.name === resultValue
          );
          if (filterIndex != -1) {
            filters[filterName][filterIndex].count++;
          }
        });
      });

      return {
        filters,
        searchResults,
      };
    });
  }

  /*
   * Build query to send to algolia for search results
   */
  _buildQuery($categoryOnly = false) {
    const filters = this.state.filters;
    const active = {};

    Object.keys(filters).forEach((filter) => {
      const names = [];

      filters[filter].forEach((el) => {
        if ($categoryOnly && filter !== "category") {
          return;
        }

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

  /*
   * Handle category changes - select either all or anything selected,
   * send query to algolia -- anything from there can be reindexed locally
   */
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

    this.setState(
      {
        filters: newFilters,
      },
      this._querySearch
    );
  }

  /*
   * Updates state when filters changed - function passed to filters component
   */
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

    this.setState(
      {
        filters: newFilters,
      },
      this._querySearch
    );
  }

  /*
   * Sort our data into order it should render
   */
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
      <div className="resource-listing">
        <Header />
        <FilterBar filters={this.state.filters} update={this._filterUpdate} />
        <Listing results={this.state.searchResults} />
      </div>
    );
  }
}

const element = document.getElementById("resource-listing");
if (element) {
  const appData = JSON.parse(element.innerHTML);
  ReactDOM.render(<App filters={appData} />, element);
}
