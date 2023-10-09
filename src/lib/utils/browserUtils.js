export function checkPopoverSupport() {
  return HTMLElement.prototype.hasOwnProperty("popover");
}

export function addPopoverFallback(element) {
  element.classList.add("popover-fallback", "popover-fallback--hidden");
}

export function hidePopoverElement(element) {
  element.classList.add("popover-fallback--hidden");
}

export function showPopoverElement(element) {
  element.classList.remove("popover-fallback--hidden");
}
