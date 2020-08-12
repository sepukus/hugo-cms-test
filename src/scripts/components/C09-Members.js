import {Component} from "../modules";

/**
 * UIKit Toggle
 *
 * @class Members
 * @extends {Component}
 */
class Members extends Component {
  /**
   * Checks scroll position is over banner or not, and applies header background.
   *
   */
  constructor() {
    super("C09");

    if (super.exists()) {
      window.UIkit.util.on("#toggle-members", "shown", function() {
        document.getElementsByClassName("C09-our-members__button-shown")[0].classList.add("hidden");
        document.getElementsByClassName("C09-our-members__button-hidden")[0].classList.remove("hidden");
      });
      window.UIkit.util.on("#toggle-members", "hidden", function() {
        document.getElementsByClassName("C09-our-members__button-shown")[0].classList.remove("hidden");
        document.getElementsByClassName("C09-our-members__button-hidden")[0].classList.add("hidden");
      });
    }
  }
}

export {Members};
