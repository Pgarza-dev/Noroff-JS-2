import { SingleReaction } from "@/components/post-reactions/singleReaction.js";
import { CustomComponent } from "../customComponent.js";
import postReactions from "./postReactions.html?raw";

export class PostReactions extends CustomComponent {
  constructor() {
    super();
    this.innerHTML = postReactions;
  }

  connectedCallback() {
    this.addEventListeners();

    this.populateData({});

    this.handleViewReactions();
  }

  addEventListeners() {}

  populateReactions(reactions) {
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

  handleViewReactions() {
    this.onCustomEvent({
      eventName: "viewReactions",
      useDocument: true,
      callback: (event) => {
        this.populateReactions(event.detail.reactions);
      },
    });
  }
}

customElements.define("post-reactions", PostReactions);
