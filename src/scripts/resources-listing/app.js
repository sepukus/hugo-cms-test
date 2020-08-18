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
      filters: this._sortInitialFilters(props.filters),
      relationships: {},
      searchResults: [],
      filtersVisible: true,
      loading: false,
    };

    /* Bind this to functions */
    this._filterUpdate = this._filterUpdate.bind(this);
    this._clearFilters = this._clearFilters.bind(this);
    this._filterToggle = this._filterToggle.bind(this);

    /* Setup Algolia */
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY);

    this.searchindex = client.initIndex(process.env.ALGOLIA_INDEX_NAME);
  }

  componentDidMount() {
    fetch("/taxrelationships.json")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          relationships: data,
        });
      });
  }

  /*
   * Get query and send to algolia
   */
  _querySearch() {
    const query = this._buildQuery();
    this.setState(
      {
        loading: true,
      },
      () => {
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
            this._filterAvailable([]);
          });
      }
    );
  }

  _filterAvailable(searchResults) {
    this.setState((currentState) => {
      const filterable = ["category", "focus", "role", "organisation_size"];
      const { filters, relationships } = currentState;

      const newFilters = {
        category: [],
        focus: [],
        role: [],
        organisation_size: [],
      };

      const activeFilters = [];

      filterable.forEach((key) => {
        filters[key].forEach((filter) => {
          if (filter.active === true) {
            activeFilters.push(filter);
          }
        });
      });

      filterable.forEach((key) => {
        filters[key].forEach((filter) => {
          if (filter.parent === "category" && filter.name === "all") {
            newFilters[key].push(filter);
            return;
          }

          const relationship = {};

          for (const activeKey in activeFilters) {
            const active = activeFilters[activeKey];

            if (active.parent === "category" && active.name === "all") {
              continue;
            }

            if (active.parent === filter.parent) {
              continue;
            }

            if (typeof relationship[active.parent] === "undefined") {
              relationship[active.parent] = false;
            }

            const hasRelationship = relationships[filter.parent][filter.name][active.parent][active.name].length;

            // Fact sheets
            // Asseessment ....
            // Large org size
            /*if (filter.parent == "organisation_size" && filter.name.indexOf("Large") > -1) {
              console.log(filter.name);
              // console.log(hasRelationship);

              console.log(relationships[filter.parent][filter.name]);

              // Object.keys(relationship).every((el) => {
              //   return relationship[el];
              // });
            }*/

            if (hasRelationship > 0) {
              relationship[active.parent] = true;
            }
          }

          const isEnabled = Object.keys(relationship).every((el) => {
            return relationship[el];
          });

          if (!filter.active) {
            filter.enabled = isEnabled;
          }

          newFilters[key].push(filter);
        });
      });

      return {
        searchResults,
        filters: newFilters,
        loading: false,
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

    const filterIndex = this.state.filters[value.parent].findIndex((el) => el.name === value.name);

    if (value.name == allKey) {
      newFilters[value.parent] = newFilters[value.parent].map((el, i) => {
        el.active = el.name == allKey ? true : false;
        return el;
      });
    } else {
      const allIndex = newFilters[value.parent].findIndex((el) => el.name == allKey);
      newFilters[value.parent][allIndex].active = false;
      newFilters[value.parent][filterIndex].active = !newFilters[value.parent][filterIndex].active;
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

    const filterIndex = this.state.filters[value.parent].findIndex((el) => el.name === value.name);

    newFilters[value.parent][filterIndex].active = !newFilters[value.parent][filterIndex].active;

    this.setState(
      {
        filters: newFilters,
      },
      this._querySearch
    );
  }

  /*
   * Reset filters
   */
  _clearFilters() {
    this.setState((currentState) => {
      let filters = currentState.filters;

      Object.keys(filters).forEach((filter) => {
        filters[filter].forEach((el) => {
          el.active = false;
        });
      });

      const allIndex = filters.category.findIndex((el) => el.name == "all");
      filters.category[allIndex].active = true;

      return {
        filters,
      };
    }, this._querySearch);
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

  _filterToggle() {
    this.setState({
      filtersVisible: !this.state.filtersVisible,
    });
  }

  render() {
    return (
      <div className="resource-listing">
        <Header filterToggle={this._filterToggle} />
        <div className="resource-listing__body">
          <FilterBar visible={this.state.filtersVisible} filters={this.state.filters} update={this._filterUpdate} clear={this._clearFilters} />
          <Listing results={this.state.searchResults} loading={this.state.loading} />
        </div>
      </div>
    );
  }
}

const element = document.getElementById("resource-listing");
if (element) {
  const appData = JSON.parse(element.innerHTML);
  ReactDOM.render(<App filters={appData} />, element);
}
