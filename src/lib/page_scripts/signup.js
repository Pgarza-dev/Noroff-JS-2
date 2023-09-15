import { isSignupFormValid } from "@lib/form_validation/validation";
import { clearErrors, displayErrors } from "../form_validation/handleErrors";

/**
 * @typedef {Object} SignupFormDataObject
 * @property {string} username - The user's username.
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 * @property {string} repeatPassword - The user's repeated password.
 */
/**
 * Creates a FormData object from a form.
 * @param {HTMLFormElement} form - The form to create the FormData object from.
 * @returns {SignupFormDataObject} The FormData object.
 *
 */
function createFormDataObject(form) {
  const formData = new FormData(form);
  const formDataObject = Object.fromEntries(formData.entries());

  return formDataObject;
}

async function handleSignUp(formDataObject) {}

const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  clearErrors();

  const form = createFormDataObject(signupForm);

  const validationResult = isSignupFormValid(form);

  console.log(validationResult);

  if (validationResult.isValid) {
    handleSignUp(form);
  } else {
    displayErrors(validationResult.errors);
  }
});
