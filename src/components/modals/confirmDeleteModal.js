import { deletePost } from "@/lib/services/posts.js";
import { postStore } from "../../lib/stores/postStore.js";
import { CustomComponent } from "../customComponent.js";
import confirmDeleteModalHtml from "./confirmDeleteModal.html?raw";
import {
  addPopoverFallback,
  checkPopoverSupport,
  hidePopoverElement,
  showPopoverElement,
} from "@/lib/utils/browserUtils.js";

export class ConfirmDeleteModal extends CustomComponent {
  constructor(postId) {
    super();
    this.innerHTML = confirmDeleteModalHtml;
    this.postId = postId;
    this.supportsPopover = checkPopoverSupport();
  }

  connectedCallback() {
    this.#addEventListeners();

    if (!this.supportsPopover) {
      addPopoverFallback(this);
    }
  }

  #addEventListeners() {
    this.onClick("deleteBtn", () => this.#handleDeletePost());
    this.onCustomEvent({
      eventName: "deletePostBtnClick",
      useDocument: true,
      callback: (event) => this.#handleDeletePostBtnClick(event),
    });

    this.onClick("cancelBtn", () => this.#handleCancel());
  }

  async #handleDeletePost() {
    if (!this.supportsPopover) {
      hidePopoverElement(this);
    }
    postStore.setState((state) => ({
      posts: state.posts.filter((post) => post.id !== parseInt(this.postId)),
    }));
    await deletePost(this.postId);
  }

  #handleCancel() {
    if (!this.supportsPopover) {
      hidePopoverElement(this);
    }
  }

  #handleDeletePostBtnClick(event) {
    this.postId = event.detail.postId;
    showPopoverElement(this);
  }
}

customElements.define("confirm-delete-modal", ConfirmDeleteModal);
