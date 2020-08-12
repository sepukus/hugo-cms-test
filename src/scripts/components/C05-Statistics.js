import {Component} from "../modules";
import {CountUp} from "countup.js";
import forEach from "lodash/forEach";
import debounce from "lodash/debounce";

/**
 * Statistics
 *
 * @class Statistics
 * @extends {Component}
 */
class Statistics extends Component {
  /**
   * Checks scroll position is over banner or not, and applies header background.
   *
   */
  constructor() {
    super("C05");
    if (super.exists()) {
      const elements = document.querySelectorAll(".C05-statistics > .uk-child-width > div");

      // eslint-disable-next-line no-unused-vars
      // set to false to show once
      let showing = false;
      // Setup a timer
      let timeout;

      // couldn't get scrollspy to work
      // also re-using debounce from sticky header made sticky header component not work
      window.addEventListener("scroll", function(event) {

        // If there's a timer, cancel it
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }

        // Setup the new requestAnimationFrame()
        timeout = window.requestAnimationFrame(function() {

          // Run our scroll functions
          // Get the bounding client rectangle position in the viewport
          const bounding = document.querySelector(".C05-statistics").getBoundingClientRect();

          // Checking if visible
          if (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            showing === false
          ) {
            forEach(elements, (elm) => {
              if (elm) {
                let options;
                if (elm.querySelector(".C05-statistics__number").innerText.indexOf(".") === -1) {
                  options = {decimalPlaces: 0};
                } else {
                  options = {decimalPlaces: 1};
                }
                const getValue = elm.querySelector(".C05-statistics__number").innerText;
                new CountUp(elm.querySelector(".C05-statistics__number"), getValue, options).start();
              }
            });
            showing = true;
            return true;
          } else {
            return false;
          }
        });
      }, false);
    }
  }
}

export {Statistics};
