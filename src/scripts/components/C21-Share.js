import {Component} from "../modules";
import forEach from "lodash/forEach";

/**
 * Share Social Bar
 *
 * @class Members
 * @extends {Component}
 */
class ShareSocial extends Component {

  constructor() {
    super("C21");

    if (super.exists()) {
      const self = this;
      document.querySelectorAll("a.social-share").forEach((link) => {
        link.addEventListener("click", (event) => {
          self.PopupHandler(link);
          event.preventDefault();
        });
      });
    }
  }

  PopupHandler(e) {
    const Config = {
      Width: 500,
      Height: 500
    };
    e = (e ? e : window.event);
    const t = (e);
    // popup position
    const px = Math.floor(((screen.availWidth || 1024) - Config.Width) / 2),
      py = Math.floor(((screen.availHeight || 700) - Config.Height) / 2);
    // open popup
    const popup = window.open(t.href, "social",
      "width=" + Config.Width + ",height=" + Config.Height +
        ",left=" + px + ",top=" + py +
        ",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
    if (popup) {
      popup.focus();
      if (e.preventDefault) e.preventDefault();
      e.returnValue = false;
    }
    return !!popup;
  }
}

export {ShareSocial};
