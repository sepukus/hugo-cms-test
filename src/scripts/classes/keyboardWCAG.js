/**
 * Keyboard Accessibility checks
 * This is to fix some foundation keyboard detects
 *
 */

import $ from "jquery";

export class keyboardWCAG {
  constructor() {
    // checks enter key for recipe filter
    $(".example").on("keyup", function (e) {
      e.preventDefault();

      if (e.keyCode === 13) {
        $("#example").addClass("open");
      }
    });
  }
}
