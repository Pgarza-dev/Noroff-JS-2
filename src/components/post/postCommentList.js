import { CustomComponent } from "../customComponent.js";
import { PostComment } from "./postComment.js";
import tempPostCommentHtml from "./postCommentTemp.html?raw";

export class PostCommentList extends CustomComponent {
  /**
   * @param {PostDataComplete} postData - The full post data returned from the API, expects the _comments, _reactions and _author flags to be set to true.
   * @param {Store} store - The store to use for the component.
   */
  constructor(postData, store) {
    super();
    this.postData = postData;
    this.store = store;
    this.unsubscribeComments = null;
    this.unsubscribeCommentsOpen = null;
  }

  connectedCallback() {
    this.#initStyles();
    this.setAttribute("aria-expanded", "false");
    this.#renderCommentList(this.postData.comments);
    this.#setupStoreSubscriptions();
  }

  disconnectedCallback() {
    this.#teardownStoreSubscriptions();
  }

  #initStyles() {
    this.classList.add(
      "transition-height-inner",
      "peer",
      "flex",
      "flex-col",
      "gap-5",
    );
  }

  #setupStoreSubscriptions() {
    this.unsubscribeComments = this.#subscribeToComments();
    this.unsubscribeCommentsOpen = this.#subscribeToCommentsOpen();
  }

  #teardownStoreSubscriptions() {
    if (this.unsubscribeComments) this.unsubscribeComments();
    if (this.unsubscribeCommentsOpen) this.unsubscribeCommentsOpen();
  }

  #subscribeToComments() {
    return this.store.subscribe((state) => {
      this.#renderCommentList(state);
    }, "comments");
  }

  #subscribeToCommentsOpen() {
    return this.store.subscribe((state) => {
      this.#toggleCommentVisibility(state);
    }, "commentsOpen");
  }

  #renderCommentList(comments) {
    comments.length
      ? this.#renderComments(comments)
      : this.#renderTempComment();
  }

  #toggleCommentVisibility(commentsOpen) {
    this.setAttribute("aria-expanded", commentsOpen ? "true" : "false");
  }

  #renderTempComment() {
    const tempComment = document.createElement("div");
    tempComment.innerHTML = tempPostCommentHtml;
    this.appendChild(tempComment);
    this.onClick("addCommentText", () => {
      this.store.setState((currentState) => ({
        ...currentState,
        commentInputOpen: true,
      }));
      this.dispatchCustomEvent({
        eventName: "focusCommentInput",
        id: this.postData.id,
      });
    });
  }

  #renderComments(comments) {
    this.innerHTML = "";
    comments.forEach((comment) => {
      const commentElement = new PostComment(comment, this.postData.id);
      this.appendChild(commentElement);
    });
  }
}

customElements.define("post-comment-list", PostCommentList);
