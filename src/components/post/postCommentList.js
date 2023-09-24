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
  }

  connectedCallback() {
    this.applyInitialStyles();
    this.unsubscribeComments = this.store.subscribe((state) => {
      this.fillCommentList(state.comments);
    }, "comments");

    this.unsubscribeCommentsOpen = this.store.subscribe((state) => {
      this.toggleComments(state.commentsOpen);
    }, "commentsOpen");
  }

  fillCommentList(comments) {
    if (!comments.length) {
      this.showTemporaryComment();
    } else {
      this.clearComments();
      this.renderComments(comments);
    }
  }

  disconnectedCallback() {
    if (this.unsubscribeComments) {
      this.unsubscribeComments();
    }

    if (this.unsubscribeCommentsOpen) {
      this.unsubscribeCommentsOpen();
    }
  }

  applyInitialStyles() {
    this.classList.add("peer", "flex", "hidden", "flex-col", "gap-5", "pt-4");
  }

  toggleComments(commentsOpen) {
    console.log("toggleComments", commentsOpen);
    commentsOpen
      ? this.classList.remove("hidden")
      : this.classList.add("hidden");
  }

  showTemporaryComment() {
    const temporaryComment = document.createElement("div");
    temporaryComment.innerHTML = tempPostCommentHtml;
    this.appendChild(temporaryComment);
  }

  clearComments() {
    this.innerHTML = "";
  }

  renderComments(comments) {
    const commentElements = comments.map(
      (comment) => new PostComment(comment, this.postData.id),
    );
    commentElements.forEach((el) => this.appendChild(el));
  }

  handleOptimisticCommentUpdate() {
    this.onCustomEvent({
      eventName: "addCommentOptimistically",
      id: this.postData.id,
      useDocument: true,
      callback: (event) => {
        this.classList.remove("hidden");
        const newComment = event.detail;
        this.postData.comments = [...this.postData.comments, newComment];
        this.fillCommentList(this.postData.comments);
      },
    });
  }

  getCommentElements() {
    return this;
  }
}

customElements.define("post-comment-list", PostCommentList);
