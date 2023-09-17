import postCommentHtml from "./postComment.html?raw";

import { CustomComponent } from "../customComponent.js";

/**
 * Class representing a PostComment component.
 * @extends CustomComponent
 */
export class PostComment extends CustomComponent {
  /**
   * Create a PostComment component.
   * @param {string} author - Author of the comment.
   * @param {string} body - Body of the comment.
   * @param {string} date - Date the comment was created.
   * @param {Element} parentEl - Parent element.
   */
  constructor(author = "", body = "", date = "", parentEl = null) {
    super();
    this.author = author;
    this.body = body;
    this.date = date;
    this.parentEl = parentEl;
  }

  /**
   * Lifecycle method called when the element is connected to the DOM.
   */
  connectedCallback() {
    this.innerHTML = postCommentHtml;
    this.classList.add(
      "border-b",
      "border-opacity-10",
      "border-white",
      "last:border-none",
    );

    this.populateData({
      commentBody: this.body,
      author: this.author,
      date: this.formatDateFromNow(this.date),
      time: this.formatDate(this.date, "HH:mm"),
      authorLink: {
        type: "attribute",
        attrName: "href",
        attrValue: `/users/${this.author}`,
      },
    });

    this.onClick("replyToCommentBtn", () =>
      this.handleReplyToCommentBtnClick(),
    );
  }

  /**
   * Handle reply to comment button click.
   */
  handleReplyToCommentBtnClick = () => {
    const inputCommentField = this.getSlot("commentField");

    if (this.isHidden(inputCommentField)) {
      this.displayElement(inputCommentField);
    }

    const field = inputCommentField.querySelector("input"); // TODO: fix this
    field.focus();
    field.value = `@${this.author} `;
  };
}

customElements.define("post-comment", PostComment);
