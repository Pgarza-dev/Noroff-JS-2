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
  constructor(postData) {
    super();
    this.postData = postData;
    this.commentsCount = this.postData.comments.length;
    this.reactionsCount = this.postData.reactions.length;
  }

  connectedCallback() {
    this.innerHTML = postButtons;
    this.populateData({
      viewCommentsBtn: this.commentsCount,
      viewReactionsBtn: this.reactionsCount,
    });
    this.addEventListeners();
    this.handleOptimisticCommentUpdate();
  }

  addEventListeners() {
    this.handleViewCommentsBtnClick();
    this.handleAddCommentBtnClick();
  }

  handleViewCommentsBtnClick = () => {
    this.onClick("viewCommentsBtn", () => this.dispatchToggleCommentsEvent());
  };

  dispatchToggleCommentsEvent = () => {
    this.dispatchCustomEvent({
      eventName: "toggleComments",
      id: this.postData.id,
    });
  };

  handleAddCommentBtnClick = () => {
    this.onClick("addCommentBtn", () => this.dispatchAddCommentEvent());
  };

  dispatchAddCommentEvent = () => {
    this.dispatchCustomEvent({
      eventName: "addComment",
      id: this.postData.id,
    });
  };

  handleOptimisticCommentUpdate() {
    this.onCustomEvent({
      eventName: "addCommentOptimistically",
      id: this.postData.id,
      useDocument: true,
      callback: () => {
        this.commentsCount++;
        this.getSlot("viewCommentsBtn").textContent = this.commentsCount;
      },
    });
  }
}

customElements.define("post-buttons", PostButtons);
