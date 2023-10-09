import { SingleReaction } from "@/components/post-reactions/singleReaction.js";
import { CustomComponent } from "../customComponent.js";
import postReactions from "./postReactions.html?raw";
import {
  addPopoverFallback,
  checkPopoverSupport,
  hidePopoverElement,
  showPopoverElement,
} from "@/lib/utils/browserUtils.js";

export class PostReactions extends CustomComponent {
  constructor() {
    super();
    this.innerHTML = postReactions;
    this.supportsPopover = checkPopoverSupport();
  }

  connectedCallback() {
    this.#handleViewReactions();

    if (!this.supportsPopover) {
      addPopoverFallback(this);
    }

    this.addEventListener();
  }

  #populateReactions(reactions) {
    const reactionList = this.getSlot("reactionList");

    if (reactions.length === 0) {
      reactionList.innerHTML = "No reactions 🥲";
      return;
    }

    reactionList.innerHTML = "";

    reactions.forEach((reaction) => {
      const singleReaction = new SingleReaction(
        reaction.symbol,
        reaction.count,
      );

      reactionList.appendChild(singleReaction);
    });
  }

  addEventListener() {
    if (!this.supportsPopover) {
      this.onClick("closeBtn", () => hidePopoverElement(this));
    }
  }

  #handleViewReactions() {
    this.onCustomEvent({
      eventName: "viewReactions",
      useDocument: true,
      callback: (event) => {
        this.#populateReactions(event.detail.reactions);
        if (!this.supportsPopover) {
          showPopoverElement(this);
        }
      },
    });
  }
}

customElements.define("post-reactions", PostReactions);
