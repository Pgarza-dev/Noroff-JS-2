import { deletePost } from "@/lib/services/posts.js";
import { CustomComponent } from "../customComponent.js";
import confirmDeleteModalHtml from "./confirmDeleteModal.html?raw";

export class ConfirmDeleteModal extends CustomComponent {
  constructor(postId) {
    super();
    this.innerHTML = confirmDeleteModalHtml;
    this.postId = postId;
  }

  connectedCallback() {
    this.addEventListeners();

    this.populateData({});
  }

  addEventListeners() {
    this.onClick("deleteBtn", () => deletePost(parseInt(this.postId)));
    this.onCustomEvent({
      eventName: "deletePostBtnClick",
      useDocument: true,
      callback: (event) => (this.postId = event.detail.postId),
    });
  }
}

customElements.define("confirm-delete-modal", ConfirmDeleteModal);
