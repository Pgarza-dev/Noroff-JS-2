import { deletePost } from "@/lib/services/posts.js";
import { CustomComponent } from "../customComponent.js";
import confirmDeleteModalHtml from "./confirmDeleteModal.html?raw";
import { postStore } from "../../lib/stores/postStore.js";
import toastStore from "@/lib/stores/toastStore.js";

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
    const serverResponse = await deletePost(this.postId);
    if (serverResponse) {
      toastStore.addToast("Post deleted!", "success");
    } else {
      toastStore.addToast("Post could not be deleted!", "error");
    }
  }
}

customElements.define("confirm-delete-modal", ConfirmDeleteModal);
