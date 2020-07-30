import { Component } from "../modules";
import debounce from "lodash/debounce";

/**
 * UIKit Accordions
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
    window.onscroll = debounce(() => {
      if (window.pageYOffset > 20) {
        document.body.classList.add("sticky-header");
      } else {
        document.body.classList.remove("sticky-header");
      }
    }, 100);
  }
}

export { StickyHeader };
