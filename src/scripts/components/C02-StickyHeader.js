import {Component} from "../modules";

/**
 * UIKit StickyHeader
 *
 * @class StickyHeader
 * @extends {Component}
 */
class StickyHeader extends Component {
  /**
   * Checks scroll position is over banner or not, and applies header background.
   *
   */
  constructor() {
    super("C01");
    // Setup a timer
    let timeout;

    // if (super.exists()) {
    window.addEventListener(
      "scroll",
      function(event) {
        // If there's a timer, cancel it
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }

        // Setup the new requestAnimationFrame()
        timeout = window.requestAnimationFrame(function() {
          if (window.pageYOffset > 20) {
            document.body.classList.add("sticky-header");
          } else {
            document.body.classList.remove("sticky-header");
          }
        }, false);
      },
      50
    );
  }
}

export {StickyHeader};
