import { reactPost } from "@/lib/services/posts.js";
import { CustomComponent } from "../customComponent.js";
import reactionBtnHtml from "./postReactionsBtn.html?raw";
import { getTotalReactionCount } from "@/lib/utils/getTotalReactionCount.js";

/**
 * PostReactionBtn component to manage reactions button.
 * @extends CustomComponent
 */
export class PostReactionBtn extends CustomComponent {
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
      viewReactionsBtn: getTotalReactionCount(reactions),
    });
  }

  addEventListeners() {
    this.onClick("reactionsMenu", this.handleReactionClick);
    this.onClick("viewReactionsBtn", this.handleViewReactionsClick);
  }

  updateReactions = (existingReactions, reactionSymbol, postId) => {
    const existingIndex = existingReactions.findIndex(
      (reaction) => reaction.symbol === reactionSymbol,
    );

    return existingIndex !== -1
      ? existingReactions.map((reaction, index) =>
          index === existingIndex
            ? { ...reaction, count: reaction.count + 1 }
            : reaction,
        )
      : [...existingReactions, { count: 1, postId, symbol: reactionSymbol }];
  };

  handleReactionClick = async (event) => {
    const reactionSymbol = event.target
      .closest(".item")
      .querySelector("span").textContent;

    const currentState = this.store.getState();
    const existingReactions = currentState.reactions;

    const updatedReactions = this.updateReactions(
      existingReactions,
      reactionSymbol,
      this.postId,
    );

    this.store.setState((currentState) => ({
      ...currentState,
      reactions: [...updatedReactions],
    }));

    await reactPost(this.postId, reactionSymbol);
  };

  handleViewReactionsClick = () => {
    this.dispatchCustomEvent({
      eventName: "viewReactions",
      detail: { reactions: this.store.getState().reactions },
    });
  };

  updateReactionCount = (reactions) => {
    const totalReactionCount = getTotalReactionCount(reactions);
    const viewReactionsBtn = this.getSlot("viewReactionsBtn");
    const incrementClasses = [
      "animate-fade-up",
      "animate-once",
      "animate-duration-300",
      "animate-fill-forwards",
    ];

    viewReactionsBtn.classList.add(...incrementClasses);
    setTimeout(() => {
      viewReactionsBtn.classList.remove(...incrementClasses);
    }, 300);

    viewReactionsBtn.textContent = totalReactionCount;
  };
}

customElements.define("post-reaction-btn", PostReactionBtn);
