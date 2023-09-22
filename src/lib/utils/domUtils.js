/**
 * Adds the "hidden" class to a specified element.
 * @param {HTMLElement} element - The DOM element to hide.
 */

export const hideElement = (element) => {
  if (!element.classList.contains("hidden")) {
    element.classList.add("hidden");
  }
};

/**
 * Removes the "hidden" class from a specified element.
 * @param {HTMLElement} element - The DOM element to display.
 */
export const displayElement = (element) => {
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
  }
};

export const isHidden = (element) => {
  return element.classList.contains("hidden");
};

export const toggleHidden = (element) => {
  element.classList.toggle("hidden");
};
