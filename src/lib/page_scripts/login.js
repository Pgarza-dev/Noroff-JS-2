import { isLoginFormValid } from "@lib/form_validation/validation";
import { clearErrors, displayErrors } from "../form_validation/handleErrors";
import { loginUser } from "@lib/services/auth";

function createFormDataObject(form) {
  const formData = new FormData(form);
  const formDataObject = Object.fromEntries(formData.entries());
  return formDataObject;
}

function handleLoginApiError(errors) {
  const apiErrorElement = document.querySelector("#api-login-error");
  errors.forEach((error) => {
    const errorElement = document.createElement("p");
    errorElement.textContent = error.message;
    apiErrorElement.appendChild(errorElement);
  });
}

async function handleLogin(formDataObject) {
  const userData = {
    email: formDataObject.email,
    password: formDataObject.password,
  };
  const response = await loginUser(userData);
  if (response.errors) {
    handleLoginApiError(response.errors);
  } else {
    window.location.href = "/pages/profile/index.html";
  }
}

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  clearErrors();

  const form = createFormDataObject(loginForm);

  const loginValidationResult = isLoginFormValid(form);

  if (loginValidationResult.isValid) {
    handleLogin(form);
  } else {
    displayErrors(loginValidationResult.errors);
  }
});

console.log("login.js loaded");
