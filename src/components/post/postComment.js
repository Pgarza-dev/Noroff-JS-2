import postCommentHtml from "./postComment.html?raw";

import { CustomComponent } from "../customComponent.js";

/**
 * Class representing a PostComment component.
 * @extends CustomComponent
 */
export class PostComment extends CustomComponent {
  /**
   * Create a PostComment component.
   * @param {CommentData} comment - The comment data.
   * @param {number} postId - The id of the post the comment belongs to.
   */
  constructor(comment, postId) {
    super();
    this.comment = comment;
    this.postId = postId;
  }

  connectedCallback() {
    this.innerHTML = postCommentHtml;
    this.classList.add(
      "border-b",
      "border-opacity-10",
      "border-white",
      "last:border-none",
    );

    const avatar = this.comment.author.avatar || "/images/default_user.png";

    this.populateData({
      commentBody: this.comment.body,
      author: this.comment.author.name,
      avatar: {
        type: "attribute",
        attrName: "src",
        attrValue: avatar,
      },
      time: this.formatDateFromNow(this.comment.date),
      authorLink: {
        type: "attribute",
        attrName: "href",
        attrValue: `/users/${this.comment.author.name}`,
      },
    });

    this.onClick("replyToCommentBtn", () => {
      this.dispatchCustomEvent({
        eventName: "replyToComment",
        id: this.postId,
        detail: {
          author: this.comment.author,
        },
      });
    });
  }
}

customElements.define("post-comment", PostComment);
