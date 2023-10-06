import { deletePost } from "@/lib/services/posts.js";
import { CustomComponent } from "../customComponent.js";
import confirmDeleteModalHtml from "./confirmDeleteModal.html?raw";
import { postStore } from "../../lib/stores/postStore.js";

export class ConfirmDeleteModal extends CustomComponent {
  constructor(postId) {
    super();
    this.innerHTML = confirmDeleteModalHtml;
    this.postId = postId;
  }

  connectedCallback() {
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.onClick("deleteBtn", () => this.#handleDeletePost());
    this.onCustomEvent({
      eventName: "deletePostBtnClick",
      useDocument: true,
      callback: (event) => (this.postId = event.detail.postId),
    });
  }

  async #handleDeletePost() {
    postStore.setState((state) => ({
      posts: state.posts.filter((post) => post.id !== parseInt(this.postId)),
    }));
    await deletePost(this.postId);
  }
}

customElements.define("confirm-delete-modal", ConfirmDeleteModal);
