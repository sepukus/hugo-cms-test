/**
 * Class to build our URL ready for API results
 *
 * @export
 * @class URLBuilder
 */
export class URLBuilder {
  constructor(settings) {

    // example for use:
    //
    // this.queryStringParams = Object.freeze({
    //  cut: cutsQuery.slice(0,-1),
    //  dish: dishQuery.slice(0,-1),
    //  cuisine: cuisineQuery.slice(0,-1),
    //  method: methodQuery.slice(0,-1),
    //  type: ""
    // });
    //
    // new URLBuilder(this.queryStringParams);
    //
    // this will then return arrays.
    let query = `?searchterm=${settings.searchterm === undefined ? "" : settings.searchterm}&pageNumber=${settings.pagenumber >= 1 ? settings.pagenumber : 1}&pageSize=9&sortOrder=${settings.sortorder === "" ? settings.sortorder : "Relevance"}&type=${settings.type === "" ? settings.type : ""}&cut=${settings.cut}&method=${settings.method}&dish=${settings.dish}&cuisine=${settings.cuisine}`;

    console.log(query);
    return query;
  }
}
