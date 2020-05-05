import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";

/**
 * Namespace
 */
export class Namespace {
  constructor() {
    this.init();

    // If we have no class set SCSGT as the default
    if (isEmpty(this.currentNamespace)) {
      document.body.classList.remove("body__");
      document.body.classList.add("body__DFAT");
      document.body.classList.add("no__theme__detected");
      // console.log("Warning: No namespace has been found on the body tag. Setting theme as "body__SCSGT"");
      this.init();
    }
  }

  /**
   * Sets the name space based on Class
   */
  init() {
    this.currentNamespace = "none";
    /* prettier-ignore */
    this.classes = filter(document.body.classList,c => c.indexOf("body__") > -1);
    /* prettier-ignore */
    this.currentNamespace = this.classes.length === 1 ? this.classes[0].replace("body__", "") : "none";
  }

  /**
   * Returns the current namespace
   * @returns {string|*} current namespace
   * @constructor
   */
  Get() {
    return this.currentNamespace;
  }
}
