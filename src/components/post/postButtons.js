import { CustomComponent } from "../customComponent.js";
import postButtons from "./postButtons.html?raw";

/**
 * Class representing PostButtons component.
 * @extends CustomComponent
 */
export class PostButtons extends CustomComponent {
  /**
   * @param {PostDataComplete} postData - The full post data returned from the API, expects the _comments, _reactions and _author flags to be set to true.
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
    this.onClick("viewCommentsBtn", (event) => {
      const state = this.toggleState(event);
      this.dispatchToggleCommentsEvent(state);
    });
  };

  toggleState(event) {
    const {
      currentTarget: { dataset },
    } = event;
    dataset.state = dataset.state === "open" ? "closed" : "open";
    return dataset.state;
  }

  dispatchToggleCommentsEvent = (state) => {
    this.dispatchCustomEvent({
      eventName: "toggleComments",
      id: this.postData.id,
      detail: { state },
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
