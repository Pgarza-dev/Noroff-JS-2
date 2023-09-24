import { CustomComponent } from "../customComponent.js";
import postButtons from "./postButtons.html?raw";

/**
 * Class representing PostButtons component.
 * @extends CustomComponent
 */
export class PostButtons extends CustomComponent {
  /**
   * @param {PostDataComplete} postData - The full post data returned from the API, expects the _comments, _reactions and _author flags to be set to true.
   * @param {Store} store - The store to use for the component.
   */
  constructor(postData, store) {
    super();
    this.postData = postData;
    this.commentsCount = this.postData.comments.length;
    this.reactionsCount = this.postData.reactions.length;
    this.store = store;
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
    this.onClick("viewCommentsBtn", (event) => {
      this.store.setState((currentState) => ({
        ...currentState,
        commentsOpen: !currentState.commentsOpen,
        commentInputOpen: currentState.commentsOpen,
      }));
      const isCommentsOpen = this.store.getState((state) => state.commentsOpen);
      this.toggleViewCommentsBtnState(event.currentTarget, isCommentsOpen);
    });
  };

  toggleViewCommentsBtnState(target, isCommentsOpen) {
    isCommentsOpen
      ? (target.dataset.state = "open")
      : (target.dataset.state = "closed");
  }

  handleAddCommentBtnClick = () => {
    this.onClick("addCommentBtn", () => {
      this.store.setState((currentState) => ({
        ...currentState,
        commentInputOpen: !currentState.commentInputOpen,
      }));
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
