import { CustomComponent } from "../customComponent.js";
import postButtons from "./postButtons.html?raw";
import { PostReactionBtn } from "./postReactionsBtns.js";

/**
 * PostButtons component to manage comments and reactions buttons.
 * @extends CustomComponent
 */
export class PostButtons extends CustomComponent {
  /**
   * @param {Store} store - Data store instance for managing state.
   * @param {postId} number - The id of the post the comment belongs to.
   */
  constructor(store, postId) {
    super();
    this.store = store;
    this.postId = postId;
  }

  connectedCallback() {
    this.innerHTML = postButtons;

    this.unsubscribeComments = this.store.subscribe(
      this.updateCommentCount,
      "comments",
    );

    this.initUI();
    this.addEventListeners();
  }

  disconnectedCallback() {
    if (this.unsubscribeComments) {
      this.unsubscribeComments();
    }
  }

  initUI() {
    const { comments } = this.store.getState();
    this.populateData({
      viewCommentsBtn: comments.length,
      addReactionBtn: new PostReactionBtn(this.store, this.postId),
    });
  }

  addEventListeners() {
    this.toggleCommentsViewOnClick();
    this.toggleCommentInputOnClick();
  }

  toggleCommentsViewOnClick = () => {
    this.onClick("viewCommentsBtn", (event) => {
      const isCommentsOpen = this.toggleCommentsAndInput();
      this.updateViewCommentsButton(event.currentTarget, isCommentsOpen);
    });
  };

  toggleCommentInputOnClick = () => {
    this.onClick("addCommentBtn", () => {
      this.store.setState((currentState) => ({
        ...currentState,
        commentInputOpen: !currentState.commentInputOpen,
      }));
    });
  };

  toggleCommentsAndInput() {
    this.store.setState((currentState) => ({
      ...currentState,
      commentsOpen: !currentState.commentsOpen,
      commentInputOpen: !currentState.commentsOpen,
    }));
    return this.store.getState((state) => state.commentsOpen);
  }

  updateViewCommentsButton(target, isOpen) {
    target.dataset.state = isOpen ? "open" : "closed";
  }

  updateCommentCount = (comments) => {
    this.getSlot("viewCommentsBtn").textContent = comments.length;
  };
}

customElements.define("post-buttons", PostButtons);
