export function displayErrors(errors) {
  for (const [key, value] of Object.entries(errors)) {
    const errorElement = document.querySelector(`#${key}-error`);
    if (errorElement) {
      errorElement.textContent = value;
    }
  }
}

export function clearErrors() {
  const errorElements = document.querySelectorAll("[id$='-error']");
  errorElements.forEach((element) => {
    element.textContent = "";
  });
}

export function handleFormApiError(errors) {
  const apiErrorElement = document.querySelector("#api-error");
  errors.forEach((error) => {
    const errorElement = document.createElement("p");
    errorElement.textContent = error.message;
    apiErrorElement.appendChild(errorElement);
  });
}
