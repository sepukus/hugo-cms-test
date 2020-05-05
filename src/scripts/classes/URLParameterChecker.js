/**
 * Class to return our URL parameters if there is any
 * If a filter (lowercase) is passed it,
 * then we don"t want to force lowercase as an output
 *
 * @export
 * @class URLParameterChecker
 */
export class URLParameterChecker {
  constructor(filter) {
    let filterCheck = filter;

    // Setup our URL Parameter checker
    const getParams = (query) => {
      if (!query) {
        return {};
      }
      return (/^[?#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params, param) => {
          let [key, value] = param.split("=");
          if (filterCheck === undefined) {
            /* prettier-ignore */
            params[key] = value.toLowerCase() ? decodeURIComponent(value.replace(/\+/g, " ").toLowerCase()) : "";
          } else {
            /* prettier-ignore */
            params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
          }
          return params;
        }, {});
    };

    // pass in url
    return getParams(document.location.search);
  }
}
