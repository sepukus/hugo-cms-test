import isString from "lodash/isString";
import isElement from "lodash/isElement";
import head from "lodash/head";
import map from "lodash/map";

/**
 * Component Super Class
 * @class Component
 */
export class Component {
  /**
   * Creates an instance of Component.
   * @param {string} id The ID of the component.
   *
   * @memberof Component
   */
  constructor(id) {
    // eslint-disable next-line no-console max-len
    /* prettier-ignore */
    console.assert(isString(id), id, "[Class Component] Requires argument for `super()` to be a String.");
    this.componentId = isString(id) ? id : "";
  }

  /**
   * Tests for the existance of a component/s.
   *
   * @returns {boolean} If the element exists.
   * @memberof Component
   */
  exists() {
    /* prettier-ignore */
    this.elements = document.querySelectorAll(`[data-id="${this.componentId.toUpperCase()}"]`);

    if (!isElement(head(this.elements))) {
      // console.info(`Component ${this.componentId.toUpperCase()} Node ✖ is not present, aborting.`);
    } else {
      // console.info(`Component ${this.componentId.toUpperCase()} Node ✔ is present, running class.`);
    }

    return isElement(head(this.elements));
  }

  /**
   * @returns {Node|*}
   * @constructor
   */
  GetElement() {
    return head(this.elements);
  }

  /**
   * @returns {NodeList|*}
   * @constructor
   */
  GetElements() {
    return this.elements;
  }

  /**
   * Static Module Method
   *
   * @param id
   * @param className
   * @constructor
   */
  static Module(id, className) {
    const componentId = isString(id) ? id : "";
    /* prettier-ignore */
    const elements = document.querySelectorAll(`[data-id="${componentId.toUpperCase()}"]`);
    /* prettier-ignore */
    map(elements, element => new className(element));
  }
}
