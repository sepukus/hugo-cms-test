import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
window.UIkit = UIkit;

/**
 * Import Classes
 */
// import $ from 'jquery';
import {Namespace, Browser, StickyHeader, Statistics, Members, Friends, ContactForm, ShareSocial} from "./modules";

// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
// UIkit.notification("Hello world.");

document.addEventListener("DOMContentLoaded", function() {
  /**
   * Classes
   */
  new Browser();
  new Namespace();

  /**
   * Components
   */
  new StickyHeader();
  new Statistics();
  new Members();
  new Friends();
  new ContactForm();
  new ShareSocial();
});

// HMR (Hot Module Replacement)
if (module.hot) {
  module.hot.accept();
}
