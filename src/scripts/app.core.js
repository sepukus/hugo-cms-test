import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
window.UIkit = UIkit;

/**
 * Import Classes
 */
// import $ from 'jquery';
import {Namespace, Browser, Accordions, StickyHeader, Statistics} from "./modules";

// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
UIkit.notification("Hello world.");

document.addEventListener("DOMContentLoaded", function () {
  /**
   * Classes
   */
  new Browser();
  new Namespace();

  /**
   * Components
   */
  new Accordions();
  new StickyHeader();
  new Statistics();
});

// HMR (Hot Module Replacement)
if (module.hot) {
  module.hot.accept();
}
