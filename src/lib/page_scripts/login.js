import { checkLoginForm } from "@lib/forms/validation";
import { clearErrors, displayErrors } from "../forms/handleErrors";
import { loginUser } from "@lib/services/auth";
import { createFormDataObject } from "@lib/forms/utils";
import { handleFormApiError } from "@lib/forms/handleErrors";

async function handleLogin(formDataObject) {
  const userData = {
    email: formDataObject.email,
    password: formDataObject.password,
  };
  const response = await loginUser(userData);
  if (response.errors) {
    handleFormApiError(response.errors);
  } else {
    window.location.href = "/pages/profile/index.html";
  }
}

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  clearErrors();

  const form = createFormDataObject(loginForm);

  const loginValidationResult = checkLoginForm(form);

  if (loginValidationResult.isValid) {
    handleLogin(form);
  } else {
    displayErrors(loginValidationResult.errors);
  }
});
