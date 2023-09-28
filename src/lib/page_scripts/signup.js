import { checkSignupForm } from "@lib/forms/validation";
import { clearErrors, displayErrors } from "@lib/forms/handleErrors";
import { registerUser } from "@lib/services/auth";
import { createFormDataObject } from "@lib/forms/utils";
import { handleFormApiError } from "@lib/forms/handleErrors";

async function handleSignUp(formDataObject) {
  const userData = {
    name: formDataObject.username,
    email: formDataObject.email,
    password: formDataObject.password,
  };
  const response = await registerUser(userData);
  if (response.errors) {
    handleFormApiError(response.errors);
  } else {
    window.location.href = "/pages/login/index.html";
  }
}

const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  clearErrors();

  const form = createFormDataObject(signupForm);

  const validationResult = checkSignupForm(form);

  if (validationResult.isValid) {
    handleSignUp(form);
  } else {
    displayErrors(validationResult.errors);
  }
});
