import { CustomComponent } from "../customComponent.js";
import { PostComment } from "./postComment.js";
import tempPostCommentHtml from "./postCommentTemp.html?raw";

export class PostCommentList extends CustomComponent {
  /**
   * @param {PostDataComplete} postData - The full post data returned from the API, expects the _comments, _reactions and _author flags to be set to true.
   */
  constructor(postData) {
    super();
    this.postData = postData;
  }

  connectedCallback() {
    this.applyInitialStyles();
    this.fillCommentList(this.postData.comments);
    this.handleOptimisticCommentUpdate();

    this.onCustomEvent({
      eventName: "toggleComments",
      id: this.postData.id,
      useDocument: true,
      callback: (event) => this.toggleComments(event.detail.state),
    });
  }

  applyInitialStyles() {
    this.classList.add("peer", "flex", "hidden", "flex-col", "gap-5", "pt-4");
  }

  toggleComments(state) {
    state === "open"
      ? this.classList.remove("hidden")
      : this.classList.add("hidden");
  }

  fillCommentList(comments) {
    if (!comments.length) {
      this.showTemporaryComment();
    } else {
      this.clearComments();
      this.renderComments(comments);
    }
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
