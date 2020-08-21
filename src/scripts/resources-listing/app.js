import React from "react";
import ReactDOM from "react-dom";

import intersection from "lodash/intersection";
import uniq from "lodash/uniq";

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
      displayDesc: true,
      page: 1,
    };

    /* Bind this to functions */
    this._filterUpdate = this._filterUpdate.bind(this);
    this._clearFilters = this._clearFilters.bind(this);
    this._filterToggle = this._filterToggle.bind(this);
    this._changeOrder = this._changeOrder.bind(this);
    this._updatePage = this._updatePage.bind(this);
    this._runQuery = this._runQuery.bind(this);

    /* Setup Algolia */
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY);
    this.searchindex = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

    this.filterBreakpoint = 960;
  }

  componentDidMount() {
    fetch("/taxrelationships.json")
      .then((response) => response.json())
      .then((data) => {
        this.setState(
          {
            relationships: data,
            filtersVisible: window.innerWidth >= this.filterBreakpoint ? true : false,
          },
          () => {
            this._querySearch();
          }
        );
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
            this.setState({
              searchResults: hits,
            });
            this._filterAvailable();
          })
          .catch((err) => {
            console.log("error", err);
            this._filterAvailable();
          });
      }
    );
  }

  _filterAvailable() {
    this.setState((currentState) => {
      const filterable = ["category", "focus", "role", "organisation_size", "industry"];
      const { filters, relationships } = currentState;

      const newFilters = {
        category: [],
        focus: [],
        role: [],
        organisation_size: [],
        industry: [],
      };

      const activeFilters = {};

      filterable.forEach((key) => {
        filters[key].forEach((filter) => {
          if (filter.parent === "category" && filter.name === "all") {
            return;
          }

          if (filter.active === true) {
            if (typeof activeFilters[key] === "undefined") {
              activeFilters[key] = [];
            }
            activeFilters[key] = uniq(activeFilters[key].concat(relationships[key][filter.name]));
          }
        });
      });

      filterable.forEach((key) => {
        // Create an array of filters excluding current parent
        const nonParentFilters = Object.keys(activeFilters)
          .map((k) => {
            if (k != key) {
              return activeFilters[k];
            }

            return false;
          })
          .filter(Boolean);

        // If parent category doesnt have any then enable all filters and return early
        if (nonParentFilters.length < 1) {
          filters[key].forEach((filter) => {
            filter.enabled = true;
            newFilters[key].push(filter);
          });

          return;
        }

        const otherFilterIntersections = intersection(...nonParentFilters);

        filters[key].forEach((filter) => {
          // If already active then skip
          if (filter.active) {
            newFilters[key].push(filter);
            return;
          }

          // Put all category into filters and continue
          if (filter.parent === "category" && filter.name === "all") {
            newFilters[key].push(filter);
            return;
          }

          const inter = intersection(otherFilterIntersections, relationships[filter.parent][filter.name]);

          filter.enabled = inter.length > 0;

          newFilters[key].push(filter);
        });
      });

      return {
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
    const allIndex = newFilters[value.parent].findIndex((el) => el.name == allKey);

    if (value.name == allKey) {
      newFilters[value.parent] = newFilters[value.parent].map((el, i) => {
        el.active = el.name == allKey ? true : false;
        return el;
      });
    } else {
      newFilters[value.parent][allIndex].active = false;
      newFilters[value.parent][filterIndex].active = !newFilters[value.parent][filterIndex].active;
    }

    const noneSelected = newFilters["category"].every((el) => el.active === false);

    if (noneSelected) {
      newFilters["category"][allIndex].active = true;
    }

    this.setState(
      {
        filters: newFilters,
        page: 1,
      },
      () => {
        if (window.innerWidth >= this.filterBreakpoint) {
          this._querySearch();
        } else {
          this._filterAvailable();
        }
      }
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
        page: 1,
      },
      () => {
        if (window.innerWidth >= this.filterBreakpoint) {
          this._querySearch();
        } else {
          this._filterAvailable();
        }
      }
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
        page: 1,
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
      industry: filters.industry,
    };
  }

  _filterToggle() {
    this.setState({
      filtersVisible: !this.state.filtersVisible,
    });
  }

  _changeOrder(displayDesc) {
    this.setState(
      {
        displayDesc: displayDesc,
      },
      () => {
        const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY);
        const indexDir = this.state.displayDesc ? process.env.ALGOLIA_INDEX_NAME : process.env.ALGOLIA_INDEX_NAME_REV;
        this.searchindex = client.initIndex(indexDir);
        this._querySearch();
      }
    );
  }

  _updatePage() {
    this.setState({
      page: this.state.page + 1,
    });
  }

  _runQuery() {
    this._querySearch();
    this.setState({
      filtersVisible: false,
    });
  }

  render() {
    return (
      <div className="resource-listing">
        <Header
          filterToggle={this._filterToggle}
          changeOrder={this._changeOrder}
          displayDesc={this.state.displayDesc}
          filtersVisible={this.state.filtersVisible}
        />
        <div className="resource-listing__body">
          <FilterBar
            visible={this.state.filtersVisible}
            filters={this.state.filters}
            update={this._filterUpdate}
            clear={this._clearFilters}
            filterToggle={this._filterToggle}
            runQuery={this._runQuery}
          />
          <Listing
            results={this.state.searchResults}
            page={this.state.page}
            perPage={12}
            pageUpdate={this._updatePage}
            loading={this.state.loading}
          />
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
