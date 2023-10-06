export class CustomComponent extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * Populates the slots in the custom component based on the provided data map.
   * The data map should have the slot name as the key and the value to populate.
   * The key should correspond to a `data-slot="key"` attribute in the HTML.
   * The value can be either a string, number, DOM Element, or an object with an `attribute`
   * type, specifying the attribute name and value.
   *
   * @param {Object.<string, (string|number|HTMLElement|{type: string, attrName: string, attrValue: string|number})>} dataMap - An object containing keys as slot names and values to populate.
   * @param {string|number|HTMLElement|{type: string, attrName: string, attrValue: string|number}} [dataMap.<key>] - The value to populate in the slot or an object specifying an attribute.
   * @param {'attribute'} [dataMap.<key>.type] - The type of data if it's an attribute.
   * @param {string} [dataMap.<key>.attrName] - The attribute name if the type is `attribute`.
   * @param {string|number} [dataMap.<key>.attrValue] - The attribute value if the type is `attribute`.
   *
   * @example
   * // HTML: <span data-slot="author"></span>
   * // Populate text content
   * populateData({ author: 'John Doe' });
   *
   * // HTML: <div data-slot="postHeader"></div>
   * // Populate DOM Element
   * populateData({ postHeader: new PostHeader(...) });
   *
   * // HTML: <a data-slot="authorLink"></a>
   * // Populate attribute
   * populateData({ authorLink: { type: 'attribute', attrName: 'href', attrValue: '/user/john' } });
   *
   */
  populateData(dataMap) {
    for (const [slotName, value] of Object.entries(dataMap)) {
      const slot = this.getSlot(slotName);

      switch (this.#determineValueType(value)) {
        case "null":
          break;
        case "primitive":
          this.#populateSlotWithText(slot, value);
          break;
        case "elementArray":
          this.#populateSlotWithElements(slot, value);
          break;
        case "element":
          this.#populateSlotWithElement(slot, value);
          break;
        case "attribute":
          this.#populateSlotWithAttribute(slot, value);
          break;
        default:
          console.warn(`Unknown type for value: ${value}`);
      }
    }
  }

  #determineValueType(value) {
    if (value === null) {
      return "null";
    }

    const valueType = typeof value;

    if (valueType === "string" || valueType === "number") {
      return "primitive";
    }

    if (value instanceof HTMLElement) {
      return "element";
    }

    if (
      Array.isArray(value) &&
      value.every((el) => el instanceof HTMLElement)
    ) {
      return "elementArray";
    }

    if (valueType === "object" && value.type === "attribute") {
      return "attribute";
    }

    return "unknown";
  }

  #populateSlotWithText(slot, value) {
    slot.textContent = value;
  }

  #populateSlotWithElements(slot, elements) {
    elements.forEach((el) => slot.appendChild(el));
  }

  #populateSlotWithElement(slot, element) {
    slot.appendChild(element);
  }

  #populateSlotWithAttribute(slot, { attrName, attrValue }) {
    slot[attrName] = attrValue;
  }

  /**
   * Dispatch a custom event from this element.
   *
   * @param {Object} params - The parameters for dispatching the custom event.
   * @param {string} params.eventName - The name of the custom event.
   * @param {object} [params.detail] - Optional. Any additional details to pass within the event.
   * @param {string} [params.id] - Optional. The ID to append to the event name.
   * @param {boolean} [params.bubbles] - Optional. Whether the event should bubble up the DOM tree.
   */
  dispatchCustomEvent({ eventName, detail = {}, id = null, bubbles = true }) {
    const fullEventName = id ? `${eventName}-${id}` : eventName;
    const event = new CustomEvent(fullEventName, { detail, bubbles });
    this.dispatchEvent(event);
  }

  /**
   * A helper method to listen to a custom events.
   *
   * @param {Object} params - The parameters for listening to the custom event.
   * @param {string} params.eventName - The base name of the event.
   * @param {Function} params.callback - The function to call when the event is triggered.
   * @param {string} [params.id] - Optional. The ID to append to the event name.
   * @param {boolean} [params.useDocument] - Optional. Whether to listen on the document instead of this element. Useful for listening to events not emitted by a child element.
   */
  onCustomEvent({ eventName, callback, id = null, useDocument = false }) {
    const fullEventName = id ? `${eventName}-${id}` : eventName;
    const target = useDocument ? document : this;
    target.addEventListener(fullEventName, (event) => {
      callback(event);
    });
  }

  getSlot(slotName) {
    return this.querySelector(`[data-slot="${slotName}"]`);
  }

  populateSlot(slotName, element) {
    const slot = this.getSlot(slotName);
    slot.appendChild(element);
  }

  onClick(slotName, callback) {
    const element = this.getSlot(slotName);
    if (element) {
      element.addEventListener("click", callback);
    } else {
      console.error(`Element with name ${slotName} not found`);
    }
  }

  /**
   * Listen for clicks outside of an element and run a callback function.
   *
   * @param {HTMLElement} element - The element to watch for outside clicks.
   * @param {Function} callback - The callback function to run on an outside click.
   */
  clickedOutside(slotName, callback) {
    const element = this.getSlot(slotName);
    const outsideClickListener = (event) => {
      if (!element.contains(event.target)) {
        callback(event);
      }
    };

    document.addEventListener("click", outsideClickListener);
  }
}
