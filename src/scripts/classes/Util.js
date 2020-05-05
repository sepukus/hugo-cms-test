import $ from "jquery";
import isElement from "lodash/isElement";

/**
 * Various Utility Methods
 * @class Util
 */
export class Util {
  constructor() {}

  /**
   * Checks if a HTMLElement has an Anchor Tag as a Parent Element.
   * @param el {HTMLElement}
   * @returns {boolean}
   */
  static isAnchorChild(el) {
    // eslint-disable-next-line no-console
    /* prettier-ignore */
    console.assert(isElement(el), "[Class Util.isAnchorChild] Argument must be a HTMLElement");
    return $(el).parents("a").length > 0;
  }

  /**
   * To Boolean. Converts "true", "false", "True", "False", "TRUE", etc to a boolean, else false;
   *
   * @example Util.toBoolean("TRUE"); // true
   * @param val
   * @returns {boolean}
   */
  static toBoolean(val) {
    switch (val.toLowerCase().trim()) {
      case "true":
      case "yes":
      case "1":
        return true;
      case "false":
      case "no":
      case "0":
      case null:
        return false;
      default:
        return Boolean(val);
    }
  }

  /**
   * Retrieve Authentication token for Web service requests
   *
   * @example Util.getAuthToken(); // ..w1jqCzEEKv_1Lgtl9WaJ
   * @returns {string}
   */
  static getAuthToken() {
    return document.getElementsByName("__RequestVerificationToken")[0].value;
  }

  static getAuth() {
    var requestToken = document.getElementsByName("__req")[0];
    console.log(requestToken);
    if (requestToken !== undefined) return requestToken.value;

    return "";
  }

  /**
   * Retrieve Host name
   *
   * @example Util.getHostName(); // http://localhost:200017 or //http:www-t.australiabeef.com.au
   * @returns {string}
   */
  static getHostName() {
    /* prettier-ignore */
    // eslint-disable-next-line max-len
    return `${window.location.protocol}//${window.location.hostname + (window.location.port ? ":" + window.location.port : "")}`;
  }
}
