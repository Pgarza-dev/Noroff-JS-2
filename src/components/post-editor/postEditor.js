import { createFormDataObject } from "@/lib/forms/utils.js";
import { updatePost } from "@/lib/services/posts.js";
import {
  addPopoverFallback,
  checkPopoverSupport,
  hidePopoverElement,
  showPopoverElement,
} from "@/lib/utils/browserUtils.js";
import { CustomComponent } from "../customComponent.js";
import postEditor from "./postEditor.html?raw";

export class PostEditor extends CustomComponent {
  constructor() {
    super();
    this.innerHTML = postEditor;
    this.supportsPopover = checkPopoverSupport();
    this.supportsPopover ? null : addPopoverFallback(this);
  }

  connectedCallback() {
    this.addEventListeners();
  }

  addEventListeners() {
    this.#handlePostEditor();
    this.onClick("cancelPostBtn", () => {
      if (!this.supportsPopover) {
        hidePopoverElement(this);
      }
    });
    this.onCustomEvent({
      eventName: "editPostBtnClick",
      useDocument: true,
      callback: () => this.handleEditPostBtnClick(),
    });
  }

  async #handlePostEditor() {
    const postEditorForm = this.querySelector("#post-editor-form");

    postEditorForm?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const { title, body, media, id } = createFormDataObject(event.target);

      const updatedPost = {};

      if (title) updatedPost.title = title;
      if (body) updatedPost.body = body;
      if (media) updatedPost.media = media;

      await updatePost(id, updatedPost);

      window.location.reload();
    });
  }

  handleEditPostBtnClick() {
    if (!this.supportsPopover) {
      showPopoverElement(this);
    }
  }
}

customElements.define("post-editor", PostEditor);
