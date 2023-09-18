import { CustomComponent } from "../customComponent.js";
import postButtons from "./postButtons.html?raw";

/**
 * Class representing PostButtons component.
 * @extends CustomComponent
 */
export class PostButtons extends CustomComponent {
  /**
   * Create a PostButtons component.
   * @param {Element} parentEl - The parent element.
   * @param {number} commentsCount - Count of comments.
   * @param {number} reactionsCount - Count of reactions.
   * @param {string} postId - ID of the post.
   */
  constructor(
    parentEl = null,
    commentsCount = 0,
    reactionsCount = 0,
    postId = null,
  ) {
    super();
    this.parentEl = parentEl;
    this.commentsCount = commentsCount;
    this.reactionsCount = reactionsCount;
    this.postId = postId;
  }

  /**
   * Lifecycle method called when the element is connected to the DOM.
   */
  connectedCallback() {
    this.innerHTML = postButtons;
    this.populateData({
      viewCommentsBtn: this.commentsCount,
      viewReactionsBtn: this.reactionsCount,
    });
    this.addEventListeners();
  }

  /**
   * Adds necessary event listeners.
   */
  addEventListeners() {
    this.handleViewCommentsBtnClick();
    this.handleAddCommentBtnClick();
  }

  /**
   * Adds click event listener for viewing comments.
   */
  handleViewCommentsBtnClick = () => {
    this.onClick("viewCommentsBtn", () => this.dispatchToggleCommentsEvent());
  };

  /**
   * Dispatches a custom event to toggle comments.
   */
  dispatchToggleCommentsEvent = () => {
    this.dispatchCustomEvent({
      eventName: "toggleComments",
      id: this.postId,
    });
  };

  /**
   * Adds click event listener for adding a comment.
   */
  handleAddCommentBtnClick = () => {
    this.onClick("addCommentBtn", () => this.dispatchAddCommentEvent());
  };

  /**
   * Dispatches a custom event to add a comment.
   */
  dispatchAddCommentEvent = () => {
    this.dispatchCustomEvent({
      eventName: "addComment",
      id: this.postId,
    });
  };
}

customElements.define("post-buttons", PostButtons);
