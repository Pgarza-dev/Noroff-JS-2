/**
 * Dispatch a custom event from an element.
 *
 * @param {HTMLElement} element - The element from which to dispatch the event.
 * @param {string} eventName - The name of the custom event.
 * @param {object} [detail] - Optional. Any additional details to pass within the event.
 */
export function dispatchCustomEvent(
  element,
  eventName,
  detail = {},
  bubbles = true,
) {
  const event = new CustomEvent(eventName, { detail, bubbles });
  element.dispatchEvent(event);
}
