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

export function createFormDataObject(form) {
  const formData = new FormData(form);
  const formDataObject = Object.fromEntries(formData.entries());
  return formDataObject;
}
