import {
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  EMAIL_DOMAIN_WHITELIST,
} from "../constants";

function checkValidString(string) {
  return /^[a-zA-Z0-9_]+$/.test(string);
}

function checkValidUsername(username, usernameMinLength) {
  return checkValidString(username) && username.length >= usernameMinLength;
}

function checkWhitelistedEmail(email, emailDomainWhiteList) {
  return emailDomainWhiteList.some((domain) => email.endsWith(domain));
}

function checkValidPassword(password, minPasswordLength) {
  return password.length >= minPasswordLength;
}

function checkPasswordsMatch(password, repeatPassword) {
  return password === repeatPassword;
}

/**
 * @typedef {Object} SignupFormDataObject
 * @property {string} username - The user's username.
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 * @property {string} repeatPassword - The user's repeated password.
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether the form data is valid.
 * @property {Object.<string, string>} errors - An object where keys are field names and values are error messages.
 */

/**
 * Validate the signup form data.
 *
 * @param {SignupFormDataObject} form - The form data to validate.
 * @returns {ValidationResult} The result of the validation.
 */
export function checkSignupForm(form) {
  const { username, email, password, repeatPassword } = form;

  const validationResult = {
    isValid: true,
    errors: {},
  };

  if (!checkValidUsername(username, USERNAME_MIN_LENGTH)) {
    validationResult.isValid = false;
    validationResult.errors.username = "Invalid username.";
  }

  if (!checkWhitelistedEmail(email, EMAIL_DOMAIN_WHITELIST)) {
    validationResult.isValid = false;
    validationResult.errors.email = `Email can only end in ${EMAIL_DOMAIN_WHITELIST[0]} or ${EMAIL_DOMAIN_WHITELIST[1]}.`;
  }

  if (!checkValidPassword(password, PASSWORD_MIN_LENGTH)) {
    validationResult.isValid = false;
    validationResult.errors.password = "Invalid password.";
  }

  if (!checkPasswordsMatch(password, repeatPassword)) {
    validationResult.isValid = false;
    validationResult.errors.repeatPassword = "Passwords do not match.";
  }

  return validationResult;
}

// SIGN UP FORM VALIDATION
export function checkLoginForm(form) {
  const { email, password } = form;

  const passwordMinLength = 8;
  const emailDomainWhiteList = ["@noroff.no", "@stud.noroff.no"];

  const loginValidationResults = {
    isValid: true,
    errors: {},
  };

  if (!checkWhitelistedEmail(email, emailDomainWhiteList)) {
    loginValidationResults.isValid = false;
    loginValidationResults.errors.email = "Invalid email.";
  }
  if (!checkValidPassword(password, passwordMinLength)) {
    loginValidationResults.isValid = false;
    loginValidationResults.errors.password = "Invalid password.";
  }
  return loginValidationResults;
}
