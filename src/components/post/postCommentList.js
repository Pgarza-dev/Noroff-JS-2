import { CustomComponent } from "../customComponent.js";
import { PostComment } from "./postComment.js";
import tempPostCommentHtml from "./postCommentTemp.html?raw";

export class PostCommentList extends CustomComponent {
  /**
   * @param {PostDataComplete} postData - The full post data returned from the API, expects the _comments, _reactions and _author flags to be set to true.
   * @param {boolean} commentsOpen - Whether the comments are open or not.
   */
  constructor(postData) {
    super();
    this.postData = postData;
    this.commentsOpen = false;
  }

  connectedCallback() {
    this.classList.add("peer", "flex", "hidden", "flex-col", "gap-5", "pt-4"); // TODO: Should this be moved to a html file with a div comment-wrapper instead?
    this.fillCommentList();
    this.handleOptimisticCommentUpdate();

    this.onCustomEvent({
      eventName: "toggleComments",
      id: this.postData.id,
      useDocument: true,
      callback: () => this.toggleComments(),
    });
  }

  toggleComments() {
    if (!this.commentsOpen) {
      this.classList.remove("hidden");
    } else {
      this.classList.add("hidden");
    }
    this.commentsOpen = !this.commentsOpen;
  }

  fillCommentList() {
    const temporaryComment = document.createElement("div");

    temporaryComment.innerHTML = tempPostCommentHtml;

    if (this.postData.comments.length === 0) {
      // console.log(this.postData.comments.length);
      this.appendChild(temporaryComment);
    } else {
      const commentElements = this.postData.comments.map((comment) => {
        return new PostComment(comment, this.postData.id);
      });
      commentElements.forEach((el) => this.appendChild(el));
    }
  }

  handleOptimisticCommentUpdate() {
    this.onCustomEvent({
      eventName: "addCommentOptimistically",
      id: this.postData.id,
      useDocument: true,
      callback: (event) => {
        const newComment = event.detail;
        const comment = new PostComment(newComment);
        this.appendChild(comment);
      },
    });
  }

  getCommentElements() {
    return this;
  }
}

customElements.define("post-comment-list", PostCommentList);
