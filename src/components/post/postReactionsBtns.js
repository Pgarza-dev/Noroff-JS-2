import { reactPost } from "@/lib/services/posts.js";
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
      viewReactionsBtn: reactions.length,
    });
  }

  addEventListeners() {
    this.onClick("reactionsMenu", this.handleReactionClick);
  }

  handleReactionClick = async (event) => {
    const reaction = event.target
      .closest(".item")
      .querySelector("span").textContent;

    const localStoreReaction = {
      count: 1,
      postId: this.postId,
      symbol: reaction,
    };

    this.store.getState().reactions.forEach((reaction) => {
      if (reaction.symbol === localStoreReaction.symbol) {
        localStoreReaction.count = reaction.count + 1;
      }
    });

    this.store.setState((currentState) => ({
      ...currentState,
      reactions: [...currentState.reactions, localStoreReaction],
    }));

    await reactPost(this.postId, reaction);
  };

  updateReactionCount = (reactions) => {
    this.getSlot("viewReactionsBtn").textContent = reactions.length;
  };
}

customElements.define("post-reaction-btn", PostReactionBtn);
