import isString from "lodash/isString";

export class Browser {
  /**
   * Creates an instance of Browser.
   * @memberof Browser
   */
  constructor() {
    this.setClassOnBody(this.detectBrowser());
  }

  /**
   * Sets a class on Body.
   *
   * @param {string} browser
   * @memberof Browser
   */
  setClassOnBody(browser) {
    /* prettier-ignore */
    isString(browser) && document.body.classList.add(`browser-${browser }`);
  }

  /**
   *
   *
   * @returns {string} String of browser
   * @memberof Browser
   */
  detectBrowser() {
    const ua = window.navigator.userAgent;

    const msie = ua.indexOf("MSIE ");
    if (msie > 0) {
      // IE 10 or older => return version number
      /* prettier-ignore */
      return "ie-" + parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }

    const trident = ua.indexOf("Trident/");
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf("rv:");
      return "ie-" + parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    }

    const edge = ua.indexOf("Edge/");
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      /* prettier-ignore */
      return "edge-" + parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
    }

    const firefox = ua.indexOf("Firefox/");
    if (firefox > 0) {
      // Firefox => return version number
      /* prettier-ignore */
      return "firefox-" + parseInt(ua.substring(firefox + 8, ua.indexOf(".", firefox)), 10);
    }

    const chrome = ua.indexOf("Chrome/");
    if (chrome > 0) {
      // Chrome => return version number
      /* prettier-ignore */
      return "chrome-" + parseInt(ua.substring(chrome + 7, ua.indexOf(".", chrome)), 10);
    }

    const safari = ua.indexOf("Safari/");
    if (safari > 0) {
      // Safari => return version number
      /* prettier-ignore */
      return "safari-" + parseInt(ua.substring(ua.indexOf("OS ") + 3).split("_")[0]);
    }

    // other browser
    return false;
  }
}
