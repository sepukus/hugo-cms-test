import {Component} from "../modules";

/**
 * UIKit Toggle
 *
 * @class Members
 * @extends {Component}
 */
class Friends extends Component {
  /**
   * Checks scroll position is over banner or not, and applies header background.
   *
   */
  constructor() {
    super("C14");

    if (super.exists()) {
      window.UIkit.util.on("#toggle-friends", "shown", function() {
        document.getElementsByClassName("C14-friends-cmhaa__button-shown")[0].classList.add("hidden");
        document.getElementsByClassName("C14-friends-cmhaa__button-hidden")[0].classList.remove("hidden");
      });
      window.UIkit.util.on("#toggle-friends", "hidden", function() {
        document.getElementsByClassName("C14-friends-cmhaa__button-shown")[0].classList.remove("hidden");
        document.getElementsByClassName("C14-friends-cmhaa__button-hidden")[0].classList.add("hidden");
      });
    }
  }
}

export {Friends};
