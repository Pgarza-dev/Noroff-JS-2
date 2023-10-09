import { createPost } from "@/lib/services/posts.js";
import { CustomComponent } from "../customComponent.js";
import postInputHtml from "./postInput.html?raw";
import {
  addPopoverFallback,
  checkPopoverSupport,
  hidePopoverElement,
  showPopoverElement,
} from "@/lib/utils/browserUtils.js";
import { createFormDataObject } from "@/lib/forms/utils.js";

export class PostInput extends CustomComponent {
  constructor() {
    super();
    this.innerHTML = postInputHtml;
    this.supportsPopover = checkPopoverSupport();
  }

  connectedCallback() {
    this.addEventListeners();

    if (!this.supportsPopover) {
      addPopoverFallback(this);
    }
  }

  addEventListeners() {
    this.addEventListener("submit", this.handleSubmit);
    this.onClick("cancelPostBtn", () => {
      if (!this.supportsPopover) {
        hidePopoverElement(this);
      }
    });
    this.onCustomEvent({
      eventName: "addPostBtnClick",
      useDocument: true,
      callback: () => this.handleAddPostBtnClick(),
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const form = createFormDataObject(event.target);
    if (!this.supportsPopover) {
      hidePopoverElement(this);
    } else {
      this.getSlot("postInput").hidePopover();
    }
    await createPost(form);
  }

  handleAddPostBtnClick() {
    if (!this.supportsPopover) {
      showPopoverElement(this);
    }
  }
}

customElements.define("post-input", PostInput);
