import { CustomComponent } from "../customComponent.js";
import singleReactionHtml from "./singleReaction.html?raw";

export class SingleReaction extends CustomComponent {
  constructor(reactionType, reactionCount) {
    super();
    this.innerHTML = singleReactionHtml;
    this.reactionType = reactionType;
    this.reactionCount = reactionCount;
  }

  connectedCallback() {
    this.populateData({
      reactionType: this.reactionType,
      reactionCount: this.reactionCount,
    });
  }
}

customElements.define("single-reaction", SingleReaction);
