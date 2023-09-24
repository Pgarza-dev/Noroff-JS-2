import { CustomComponent } from "../customComponent.js";
import reactionBtnHtml from "./postReactionsBtn.html?raw";

//TODO: manage only 1 reaction per type per user

/**
 * PostReactionBtn component to manage reactions button.
 * @extends CustomComponent
 */
export class PostReactionBtn extends CustomComponent {
  /**
   * @param {Store} store - Data store instance for managing state.
   */
  constructor(store) {
    super();
    this.store = store;
  }

  connectedCallback() {
    this.innerHTML = reactionBtnHtml;

    this.unsubscribeReactions = this.store.subscribe(
      this.updateReactionCount,
      "reactions",
    );

    this.initUI();
    this.addEventListeners();
  }

  disconnectedCallback() {
    if (this.unsubscribeReactions) {
      this.unsubscribeReactions();
    }
  }

  initUI() {
    const { reactions } = this.store.getState();
    this.populateData({
      viewReactionsBtn: reactions.length,
    });
  }

  addEventListeners() {
    this.onClick("reactionsMenu", this.handleReactionClick);
  }

  handleReactionClick = (event) => {
    const reaction = event.target
      .closest(".item")
      .querySelector("span").textContent;

    this.store.setState((currentState) => ({
      ...currentState,
      reactions: [...currentState.reactions, reaction],
    }));

    //TODO: send reaction to API @Pgarza-dev
  };

  updateReactionCount = (reactions) => {
    this.getSlot("viewReactionsBtn").textContent = reactions.length;
  };
}

customElements.define("post-reaction-btn", PostReactionBtn);
