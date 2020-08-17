import {Component} from "../modules";

/**
 * UIKit Forms with custom javascript validation
 *
 * @class ContactForm
 * @extends {Component}
 */
class ContactForm extends Component {
  constructor() {
    super("C16");

    if (super.exists()) {
      const self = this;
      const form = document.getElementById("contact");
      const fullname = document.getElementById("fullname");
      const email    = document.getElementById("email");
      const message  = document.getElementById("message");

      const fullnameError = document.querySelector("#fullname + span.uk-text-danger");
      const emailError    = document.querySelector("#email + span.uk-text-danger");
      const messageError  = document.querySelector("#message + span.uk-text-danger");

      fullname.addEventListener("input", function(event) {
        if (fullname.validity.valid) {
          fullnameError.innerHTML = "";
          fullnameError.className = "uk-text-danger";
          fullname.classList.remove("uk-form-danger");
        }
        else {
          self.showError();
          fullname.classList.add("uk-form-danger");
        }
      });

      email.addEventListener("input", function(event) {
        if (email.validity.valid) {
          emailError.innerHTML = "";
          emailError.className = "uk-text-danger";
          email.classList.remove("uk-form-danger");
        }
        else {
          self.showError();
          email.classList.add("uk-form-danger");
        }
      });

      message.addEventListener("input", function(event) {
        if (message.validity.valid) {
          messageError.innerHTML = "";
          messageError.className = "uk-text-danger";
          message.classList.remove("uk-form-danger");
        }
        else {
          self.showError();
          message.classList.add("uk-form-danger");
        }
      });

      form.addEventListener("submit", function(event) {
        if (!fullname.validity.valid) {
          self.showError();
          fullname.classList.add("uk-form-danger");
        }
        if (!email.validity.valid) {
          self.showError();
          email.classList.add("uk-form-danger");
        }
        if (!message.validity.valid) {
          self.showError();
          message.classList.add("uk-form-danger");
        }

        event.preventDefault();
        if (fullname.validity.valid && email.validity.valid && message.validity.valid) {
          form.submit();
        }
      });
    }
  }

  showError() {
    const fullname = document.getElementById("fullname");
    const email    = document.getElementById("email");
    const message  = document.getElementById("message");

    const fullnameError = document.querySelector("#fullname + span.uk-text-danger");
    const emailError    = document.querySelector("#email + span.uk-text-danger");
    const messageError  = document.querySelector("#message + span.uk-text-danger");

    // REQUIRED VALIDATIONS
    if (fullname.validity.valueMissing) {
      fullnameError.textContent = "Required field";
    }
    else if (fullname.validity.patternMismatch) {
      fullnameError.textContent = "The field accepts only alphabetic characters and spaces";
    }
    else if (fullname.validity.tooShort) {
      fullnameError.textContent = `The field must contain minimum ${fullname.minLength} characters; you have inserted ${fullname.value.length }.`;
    }
    else if (fullname.validity.tooLong) {
      fullnameError.textContent = `The field must contain minimum ${fullname.maxLength} characters; you have inserted ${fullname.value.length}.`;
    }

    // E-MAIL
    if (email.validity.valueMissing) {
      emailError.textContent = "Required field";
    }
    else if (email.validity.typeMismatch || email.validity.patternMismatch) {
      emailError.textContent = "The field must contain a valid e-mail address";
    }

    // MESSAGE
    if (message.validity.valueMissing) {
      messageError.textContent = "Required field";
    }
    else if (message.validity.tooLong) {
      messageError.textContent = `The field must contain minimum ${message.maxLength} characters; you have inserted ${message.value.length}.`;
    }

    // add the class to show the error
    fullnameError.className = "uk-text-danger uk-text-small";
    emailError.className    = "uk-text-danger uk-text-small";
    messageError.className  = "uk-text-danger uk-text-small";
  }
}

export {ContactForm};
