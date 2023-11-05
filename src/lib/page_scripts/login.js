import { removeActiveUser } from "@/lib/utils/handleLocalStorageUser";
import { handleFormApiError } from "@lib/forms/handleErrors";
import { createFormDataObject } from "@lib/forms/utils";
import { checkLoginForm } from "@lib/forms/validation";
import { loginUser } from "@lib/services/auth";
import { clearErrors, displayErrors } from "../forms/handleErrors";

removeActiveUser();

async function handleLogin(formDataObject) {
  const userData = {
    email: formDataObject.email,
    password: formDataObject.password,
  };
  const response = await loginUser(userData);

  if (response.error) {
    handleFormApiError([response.error]);
  } else {
    window.location.href = "/";
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
