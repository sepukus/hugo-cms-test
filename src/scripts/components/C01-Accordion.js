import { Component } from "../modules";
import forEach from "lodash/forEach";

/**
 * UIKit Accordions
 *
 * @class LazyLoading
 * @extends {Component}
 */
class Accordions extends Component {
  /**
   * Creates an instance of Accordions.
   *
   * @memberof Accordions
   */
  constructor() {
    super("C01");

    if (super.exists()) {
      const elements = document.querySelectorAll(".accordion");

      forEach(elements, (elm) => {
        if (elm) {
          /* prettier-ignore */
          console.log(elm);
          window.UIkit.accordion(elm);
        }
      });
    }
  }
}

export { Accordions };
