function isValidString(string) {
  return /^[a-zA-Z0-9_]+$/.test(string);
}

function isValidUsername(username, usernameMinLength) {
  return isValidString(username) && username.length >= usernameMinLength;
}

function isWhitelistedEmail(email, emailDomainWhiteList) {
  return emailDomainWhiteList.some((domain) => email.endsWith(domain));
}

function isValidPassword(password, minPasswordLength) {
  return password.length >= minPasswordLength;
}

function doPasswordsMatch(password, repeatPassword) {
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
export function isSignupFormValid(form) {
  const { username, email, password, repeatPassword } = form;

  const usernameMinLength = 1;
  const passwordMinLength = 8;
  const emailDomainWhiteList = ["@noroff.no", "@stud.noroff.no"];

  const validationResult = {
    isValid: true,
    errors: {},
  };

  if (!isValidUsername(username, usernameMinLength)) {
    validationResult.isValid = false;
    validationResult.errors.username = "Invalid username.";
  }

  if (!isWhitelistedEmail(email, emailDomainWhiteList)) {
    validationResult.isValid = false;
    validationResult.errors.email = "not whitelisted.";
  }

  if (!isValidPassword(password, passwordMinLength)) {
    validationResult.isValid = false;
    validationResult.errors.password = "Invalid password.";
  }

  if (!doPasswordsMatch(password, repeatPassword)) {
    validationResult.isValid = false;
    validationResult.errors.repeatPassword = "Passwords do not match.";
  }

  return validationResult;
}

// SIGN UP FORM VALIDATION
export function isLoginFormValid(form) {
  const { email, password } = form;

  const passwordMinLength = 8;
  const emailDomainWhiteList = ["@noroff.no", "@stud.noroff.no"];

  const loginValidationResults = {
    isValid: true,
    errors: {},
  };

  if (!isWhitelistedEmail(email, emailDomainWhiteList)) {
    loginValidationResults.isValid = false;
    loginValidationResults.errors.email = "Invalid email.";
  }
  if (!isValidPassword(password, passwordMinLength)) {
    loginValidationResults.isValid = false;
    loginValidationResults.errors.password = "Invalid password.";
  }
  return loginValidationResults;
}
